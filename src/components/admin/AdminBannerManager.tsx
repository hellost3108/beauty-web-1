"use client";

import {
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileText,
  GripVertical,
  ImageIcon,
  Images,
  LayoutDashboard,
  Menu,
  MessageSquareQuote,
  MoreHorizontal,
  Package,
  Plus,
  RotateCcw,
  Save,
  Settings,
  ShieldCheck,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useSiteContent } from "@/context/SiteContentContext";
import type { HomeBanner } from "@/data/homeBanners";

import styles from "./AdminBannerManager.module.css";

const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;
const MAX_STORED_IMAGE_BYTES = 1.35 * 1024 * 1024;
const MAX_IMAGE_EDGE = 1920;

type EditorMode = "add" | "edit";
type EditorErrors = Partial<Record<"label" | "src" | "alt" | "focus" | "durationMs", string>>;

const supportedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

const createBlankBanner = (order: number): HomeBanner => ({
  id: `banner-${Date.now()}`,
  src: "",
  mobileSrc: "",
  alt: "",
  label: "",
  focus: "center",
  enabled: false,
  order,
  durationMs: 6500,
  href: "",
});

const normalizeOrder = (items: HomeBanner[]) =>
  items.map((item, order) => ({ ...item, order }));

const formatUpdatedAt = (value: string | number | Date | null | undefined) => {
  if (!value) return "Chưa có thay đổi";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "Vừa cập nhật";
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

const fileToDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Không thể đọc tệp ảnh."));
    reader.readAsDataURL(blob);
  });

const loadImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Không thể xử lý ảnh đã chọn."));
    image.src = url;
  });

const compressImage = async (file: File) => {
  if (!supportedImageTypes.has(file.type)) {
    throw new Error("Chỉ hỗ trợ JPG, PNG, WebP hoặc AVIF.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Ảnh vượt quá 12 MB. Vui lòng chọn tệp nhỏ hơn.");
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await loadImage(objectUrl);
    const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Trình duyệt không hỗ trợ nén ảnh.");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const compressed = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.84),
    );
    if (!compressed) throw new Error("Không thể nén ảnh sang WebP.");
    if (compressed.size > MAX_STORED_IMAGE_BYTES) {
      throw new Error("Ảnh sau khi nén vẫn quá lớn. Hãy dùng ảnh ít chi tiết hơn hoặc kích thước nhỏ hơn.");
    }
    return fileToDataUrl(compressed);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

const validateBanner = (banner: HomeBanner): EditorErrors => {
  const errors: EditorErrors = {};
  if (!banner.label.trim()) errors.label = "Nhập tên hiển thị của banner.";
  if (!banner.src.trim()) errors.src = "Thêm đường dẫn hoặc tải ảnh banner lên.";
  if (!banner.alt.trim()) errors.alt = "Mô tả ảnh là bắt buộc cho khả năng tiếp cận.";
  if (!banner.focus.trim()) errors.focus = "Nhập vị trí trọng tâm của ảnh.";
  if (!Number.isFinite(banner.durationMs) || banner.durationMs < 3000 || banner.durationMs > 30000) {
    errors.durationMs = "Thời lượng phải từ 3 đến 30 giây.";
  }
  return errors;
};

const isValidImportedBanner = (value: unknown): value is Record<string, unknown> => {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.src === "string" &&
    typeof item.alt === "string" &&
    typeof item.label === "string" &&
    typeof item.focus === "string"
  );
};

type BannerEditorProps = {
  banner: HomeBanner | null;
  mode: EditorMode;
  onClose: () => void;
  onCommit: (banner: HomeBanner) => void;
};

const BannerEditor = ({ banner, mode, onClose, onCommit }: BannerEditorProps) => {
  const [draft, setDraft] = useState<HomeBanner | null>(banner);
  const [errors, setErrors] = useState<EditorErrors>({});
  const [previewBroken, setPreviewBroken] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [editorDirty, setEditorDirty] = useState(false);

  useEffect(() => {
    setDraft(banner);
    setErrors({});
    setPreviewBroken(false);
    setEditorDirty(false);
  }, [banner]);

  if (!draft) return null;

  const updateDraft = <Key extends keyof HomeBanner>(key: Key, value: HomeBanner[Key]) => {
    setDraft((current) => (current ? { ...current, [key]: value } : current));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setEditorDirty(true);
    if (key === "src") setPreviewBroken(false);
  };

  const requestClose = () => {
    if (editorDirty && !window.confirm("Bạn có thay đổi chưa lưu trong biểu mẫu. Đóng mà không giữ lại?")) {
      return;
    }
    onClose();
  };

  const onUpload = async (event: ChangeEvent<HTMLInputElement>, field: "src" | "mobileSrc") => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setIsCompressing(true);
    try {
      const dataUrl = await compressImage(file);
      updateDraft(field, dataUrl);
      toast.success(field === "src" ? "Đã nén và thêm ảnh chính" : "Đã nén và thêm ảnh mobile");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể tải ảnh.");
    } finally {
      setIsCompressing(false);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateBanner(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error("Kiểm tra lại các trường bắt buộc.");
      return;
    }
    onCommit({
      ...draft,
      label: draft.label.trim(),
      src: draft.src.trim(),
      mobileSrc: draft.mobileSrc?.trim() || undefined,
      alt: draft.alt.trim(),
      focus: draft.focus.trim(),
      href: draft.href?.trim() || undefined,
    });
  };

  return (
    <Sheet open={Boolean(banner)} onOpenChange={(open) => !open && requestClose()}>
      <SheetContent
        side="right"
        className={styles.editorSheet}
        style={{ width: "min(96vw, 76rem)", maxWidth: "min(96vw, 76rem)" }}
      >
        <form className={styles.editorForm} onSubmit={submit} noValidate>
          <SheetHeader className={styles.editorHeader}>
            <div>
              <p className={styles.eyebrow}>{mode === "add" ? "Banner mới" : "Chỉnh sửa banner"}</p>
              <SheetTitle>{mode === "add" ? "Tạo một banner" : draft.label || "Banner chưa đặt tên"}</SheetTitle>
              <SheetDescription>
                Thay đổi chỉ được đưa vào danh sách nháp cho đến khi bạn chọn “Lưu & áp dụng”.
              </SheetDescription>
            </div>
          </SheetHeader>

          <div className={styles.editorBody}>
            <div className={styles.editorFields}>
              <section className={styles.formSection} aria-labelledby="admin-banner-content-title">
                <div className={styles.formSectionHeading}>
                  <span>01</span>
                  <div>
                    <h3 id="admin-banner-content-title">Nội dung</h3>
                    <p>Thông tin xuất hiện trên thanh điều hướng banner.</p>
                  </div>
                </div>

                <div className={styles.field}>
                  <Label htmlFor="banner-label">Tên hiển thị *</Label>
                  <Input
                    id="banner-label"
                    value={draft.label}
                    onChange={(event) => updateDraft("label", event.target.value)}
                    placeholder="Ví dụ: The science of melanin"
                    aria-invalid={Boolean(errors.label)}
                    aria-describedby={errors.label ? "banner-label-error" : undefined}
                  />
                  {errors.label && <p className={styles.fieldError} id="banner-label-error">{errors.label}</p>}
                </div>

                <div className={styles.field}>
                  <Label htmlFor="banner-alt">Mô tả ảnh (alt) *</Label>
                  <Textarea
                    id="banner-alt"
                    value={draft.alt}
                    onChange={(event) => updateDraft("alt", event.target.value)}
                    placeholder="Mô tả ngắn gọn nội dung chính trong ảnh"
                    aria-invalid={Boolean(errors.alt)}
                    aria-describedby={errors.alt ? "banner-alt-error" : "banner-alt-help"}
                  />
                  <p className={styles.fieldHelp} id="banner-alt-help">Mô tả cho người không thể nhìn thấy hình ảnh.</p>
                  {errors.alt && <p className={styles.fieldError} id="banner-alt-error">{errors.alt}</p>}
                </div>

                <div className={styles.field}>
                  <Label htmlFor="banner-href">Liên kết khi bấm</Label>
                  <Input
                    id="banner-href"
                    value={draft.href ?? ""}
                    onChange={(event) => updateDraft("href", event.target.value)}
                    placeholder="/shop hoặc https://…"
                  />
                </div>
              </section>

              <section className={styles.formSection} aria-labelledby="admin-banner-media-title">
                <div className={styles.formSectionHeading}>
                  <span>02</span>
                  <div>
                    <h3 id="admin-banner-media-title">Hình ảnh</h3>
                    <p>Ảnh được nén thành WebP trước khi lưu trên thiết bị.</p>
                  </div>
                </div>

                <div className={styles.field}>
                  <Label htmlFor="banner-src">Ảnh chính *</Label>
                  <Input
                    id="banner-src"
                    value={draft.src}
                    onChange={(event) => updateDraft("src", event.target.value)}
                    placeholder="/assets/banner.png hoặc URL ảnh"
                    aria-invalid={Boolean(errors.src)}
                    aria-describedby={errors.src ? "banner-src-error" : undefined}
                  />
                  <label className={styles.uploadButton}>
                    <Upload aria-hidden="true" />
                    {isCompressing ? "Đang tối ưu ảnh…" : "Tải ảnh chính lên"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      onChange={(event) => void onUpload(event, "src")}
                      disabled={isCompressing}
                    />
                  </label>
                  {errors.src && <p className={styles.fieldError} id="banner-src-error">{errors.src}</p>}
                </div>

                <div className={styles.field}>
                  <Label htmlFor="banner-mobile-src">Ảnh riêng cho mobile</Label>
                  <Input
                    id="banner-mobile-src"
                    value={draft.mobileSrc ?? ""}
                    onChange={(event) => updateDraft("mobileSrc", event.target.value)}
                    placeholder="Để trống để dùng ảnh chính"
                  />
                  <label className={styles.uploadButton}>
                    <Upload aria-hidden="true" />
                    Tải ảnh mobile lên
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      onChange={(event) => void onUpload(event, "mobileSrc")}
                      disabled={isCompressing}
                    />
                  </label>
                </div>
              </section>

              <section className={styles.formSection} aria-labelledby="admin-banner-display-title">
                <div className={styles.formSectionHeading}>
                  <span>03</span>
                  <div>
                    <h3 id="admin-banner-display-title">Hiển thị</h3>
                    <p>Điều chỉnh cách banner hoạt động trên trang chủ.</p>
                  </div>
                </div>

                <div className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <Label htmlFor="banner-focus">Trọng tâm ảnh *</Label>
                    <Input
                      id="banner-focus"
                      value={draft.focus}
                      onChange={(event) => updateDraft("focus", event.target.value)}
                      placeholder="center hoặc 60% center"
                      aria-invalid={Boolean(errors.focus)}
                      aria-describedby={errors.focus ? "banner-focus-error" : "banner-focus-help"}
                    />
                    <p className={styles.fieldHelp} id="banner-focus-help">Theo cú pháp CSS object-position.</p>
                    {errors.focus && <p className={styles.fieldError} id="banner-focus-error">{errors.focus}</p>}
                  </div>

                  <div className={styles.field}>
                    <Label htmlFor="banner-duration">Thời lượng (giây) *</Label>
                    <Input
                      id="banner-duration"
                      type="number"
                      inputMode="decimal"
                      min={3}
                      max={30}
                      step={0.5}
                      value={draft.durationMs / 1000}
                      onChange={(event) => updateDraft("durationMs", Number(event.target.value) * 1000)}
                      aria-invalid={Boolean(errors.durationMs)}
                      aria-describedby={errors.durationMs ? "banner-duration-error" : undefined}
                    />
                    {errors.durationMs && <p className={styles.fieldError} id="banner-duration-error">{errors.durationMs}</p>}
                  </div>
                </div>

                <div className={styles.switchRow}>
                  <div>
                    <Label htmlFor="banner-enabled">Hiển thị trên trang chủ</Label>
                    <p>Banner tắt vẫn được giữ trong danh sách nháp.</p>
                  </div>
                  <Switch
                    id="banner-enabled"
                    checked={draft.enabled}
                    onCheckedChange={(checked) => updateDraft("enabled", checked)}
                    aria-label={draft.enabled ? "Tắt banner" : "Bật banner"}
                  />
                </div>
              </section>
            </div>

            <aside className={styles.previewPanel} aria-labelledby="banner-preview-title">
              <div className={styles.previewHeading}>
                <div>
                  <p className={styles.eyebrow}>Xem trước</p>
                  <h3 id="banner-preview-title">Khung 16:9</h3>
                </div>
                <span>{draft.enabled ? "Đang bật" : "Đang tắt"}</span>
              </div>

              <div className={styles.preview}>
                {draft.src && !previewBroken ? (
                  <img
                    src={draft.src}
                    alt=""
                    style={{ objectPosition: draft.focus || "center" }}
                    onError={() => setPreviewBroken(true)}
                  />
                ) : (
                  <div className={styles.previewEmpty}>
                    <ImageIcon aria-hidden="true" />
                    <span>{previewBroken ? "Không tải được ảnh từ đường dẫn này" : "Thêm ảnh để xem trước"}</span>
                  </div>
                )}
                <div className={styles.previewScrim} aria-hidden="true" />
                <div className={styles.previewRail} aria-hidden="true">
                  <span />
                  <strong>{draft.label || "Tên banner"}</strong>
                </div>
              </div>
              <p className={styles.previewNote}>
                Kiểm tra logo và nội dung không bị sát mép. Ảnh banner chính nên có tỷ lệ 16:9 và chiều rộng tối thiểu 1.600 px.
              </p>
            </aside>
          </div>

          <div className={styles.editorFooter}>
            <Button type="button" variant="outline" onClick={requestClose}>Hủy</Button>
            <Button type="submit" disabled={isCompressing}>
              <Check aria-hidden="true" />
              {mode === "add" ? "Thêm vào bản nháp" : "Cập nhật bản nháp"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

const AdminBannerManager = () => {
  const { banners, ready, updatedAt, saveBanners, resetBanners } = useSiteContent();
  const [drafts, setDrafts] = useState<HomeBanner[]>([]);
  const [dirty, setDirty] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editorBanner, setEditorBanner] = useState<HomeBanner | null>(null);
  const [editorMode, setEditorMode] = useState<EditorMode>("edit");
  const [pendingDelete, setPendingDelete] = useState<HomeBanner | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ready && !dirty) setDrafts(normalizeOrder(banners));
  }, [banners, dirty, ready]);

  useEffect(() => {
    if (!dirty) return;
    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [dirty]);

  const enabledCount = drafts.filter((banner) => banner.enabled).length;
  const disabledCount = drafts.length - enabledCount;
  const averageSeconds = drafts.length
    ? Math.round((drafts.reduce((sum, banner) => sum + banner.durationMs, 0) / drafts.length / 1000) * 10) / 10
    : 0;

  const statItems = useMemo(
    () => [
      { label: "Tổng banner", value: drafts.length, note: "Trong danh sách hiện tại", icon: Images },
      { label: "Đang hiển thị", value: enabledCount, note: "Xuất hiện trên carousel", icon: Eye },
      { label: "Đang tắt", value: disabledCount, note: "Vẫn được lưu trên thiết bị", icon: ImageIcon },
      { label: "Nhịp chuyển", value: `${averageSeconds}s`, note: "Trung bình mỗi banner", icon: LayoutDashboard },
    ],
    [averageSeconds, disabledCount, drafts.length, enabledCount],
  );

  const markDrafts = (next: HomeBanner[]) => {
    setDrafts(normalizeOrder(next));
    setDirty(true);
  };

  const openAdd = () => {
    setEditorMode("add");
    setEditorBanner(createBlankBanner(drafts.length));
  };

  const openEdit = (banner: HomeBanner) => {
    setEditorMode("edit");
    setEditorBanner({ ...banner });
  };

  const commitEditor = (banner: HomeBanner) => {
    if (editorMode === "add") {
      markDrafts([...drafts, banner]);
      toast.success("Đã thêm banner vào bản nháp");
    } else {
      markDrafts(drafts.map((item) => (item.id === banner.id ? banner : item)));
      toast.success("Đã cập nhật banner trong bản nháp");
    }
    setEditorBanner(null);
  };

  const toggleBanner = (id: string, enabled: boolean) => {
    markDrafts(drafts.map((banner) => (banner.id === id ? { ...banner, enabled } : banner)));
  };

  const moveBanner = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= drafts.length) return;
    const next = [...drafts];
    [next[index], next[target]] = [next[target], next[index]];
    markDrafts(next);
    toast.success(direction < 0 ? "Đã đưa banner lên trên" : "Đã đưa banner xuống dưới");
  };

  const duplicateBanner = (banner: HomeBanner) => {
    const index = drafts.findIndex((item) => item.id === banner.id);
    const copy: HomeBanner = {
      ...banner,
      id: `banner-${Date.now()}`,
      label: `${banner.label} — bản sao`,
      enabled: false,
      order: index + 1,
    };
    const next = [...drafts];
    next.splice(index + 1, 0, copy);
    markDrafts(next);
    toast.success("Đã nhân bản banner ở trạng thái tắt");
  };

  const deleteBanner = () => {
    if (!pendingDelete) return;
    markDrafts(drafts.filter((banner) => banner.id !== pendingDelete.id));
    toast.success(`Đã xóa “${pendingDelete.label}” khỏi bản nháp`);
    setPendingDelete(null);
  };

  const applyDrafts = async () => {
    const invalid = drafts.find((banner) => Object.keys(validateBanner(banner)).length > 0);
    if (invalid) {
      toast.error(`Banner “${invalid.label || "chưa đặt tên"}” còn thiếu thông tin.`);
      openEdit(invalid);
      return;
    }
    const result = await Promise.resolve(saveBanners(normalizeOrder(drafts)));
    if (!result.ok) {
      toast.error(result.error ?? "Không thể lưu bản nháp.");
      return;
    }
    setDirty(false);
    toast.success("Đã lưu và áp dụng bản nháp trên thiết bị này");
  };

  const resetToDefaults = async () => {
    const result = await Promise.resolve(resetBanners());
    if (!result.ok) {
      toast.error(result.error ?? "Không thể khôi phục banner mặc định.");
      return;
    }
    setDirty(false);
    setResetOpen(false);
    toast.success("Đã khôi phục bộ banner mặc định");
  };

  const exportJson = () => {
    const payload = JSON.stringify(
      {
        version: 1,
        scope: "melalogy-device-draft",
        exportedAt: new Date().toISOString(),
        banners: drafts,
      },
      null,
      2,
    );
    const url = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `melalogy-banners-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
    toast.success("Đã xuất tệp banner JSON");
  };

  const importJson = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > 12 * 1024 * 1024) {
      toast.error("Tệp JSON vượt quá 12 MB.");
      return;
    }
    try {
      const parsed = JSON.parse(await file.text()) as unknown;
      const collection = Array.isArray(parsed)
        ? parsed
        : parsed && typeof parsed === "object" && Array.isArray((parsed as { banners?: unknown }).banners)
          ? (parsed as { banners: unknown[] }).banners
          : null;
      if (!collection || collection.length === 0 || !collection.every(isValidImportedBanner)) {
        throw new Error("Tệp không chứa danh sách banner hợp lệ.");
      }

      const ids = new Set<string>();
      const imported = collection.map((item, order): HomeBanner => {
        const idCandidate = String(item.id).trim() || `banner-import-${Date.now()}-${order}`;
        const id = ids.has(idCandidate) ? `${idCandidate}-${order}` : idCandidate;
        ids.add(id);
        return {
          id,
          src: String(item.src),
          mobileSrc: typeof item.mobileSrc === "string" && item.mobileSrc.trim() ? item.mobileSrc : undefined,
          alt: String(item.alt),
          label: String(item.label),
          focus: String(item.focus) || "center",
          enabled: typeof item.enabled === "boolean" ? item.enabled : true,
          order,
          durationMs:
            typeof item.durationMs === "number" && item.durationMs >= 3000 && item.durationMs <= 30000
              ? item.durationMs
              : 6500,
          href: typeof item.href === "string" && item.href.trim() ? item.href : undefined,
        };
      });
      markDrafts(imported);
      toast.success(`Đã nhập ${imported.length} banner vào bản nháp`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể đọc tệp JSON.");
    }
  };

  if (!ready) {
    return (
      <div className={styles.loading} role="status">
        <img src="/assets/logo.png" alt="Melalogy" />
        <span>Đang chuẩn bị không gian quản trị…</span>
      </div>
    );
  }

  return (
    <div
      className={styles.page}
      data-modal-open={Boolean(editorBanner || pendingDelete || resetOpen)}
    >
      <a className={styles.skipLink} href="#admin-main">Đi đến nội dung chính</a>

      {sidebarOpen && (
        <button
          type="button"
          className={styles.sidebarBackdrop}
          aria-label="Đóng menu quản trị"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarBrand}>
          <Link href="/" aria-label="Melalogy — mở trang chủ">
            <img src="/assets/logo.png" alt="Melalogy" />
          </Link>
          <button type="button" aria-label="Đóng menu" onClick={() => setSidebarOpen(false)}>
            <X aria-hidden="true" />
          </button>
        </div>

        <div className={styles.adminIdentity}>
          <span>MC</span>
          <div>
            <strong>Melalogy Content</strong>
            <small>Bản nháp trên thiết bị</small>
          </div>
        </div>

        <nav className={styles.sidebarNav} aria-label="Điều hướng quản trị">
          <p>Nội dung</p>
          <a href="#overview" onClick={() => setSidebarOpen(false)}>
            <LayoutDashboard aria-hidden="true" />
            Tổng quan
          </a>
          <a href="#banners" aria-current="page" onClick={() => setSidebarOpen(false)}>
            <Images aria-hidden="true" />
            Banner trang chủ
            <span>{drafts.length}</span>
          </a>
          <button type="button" disabled>
            <Package aria-hidden="true" />
            Sản phẩm
            <span>Sắp có</span>
          </button>
          <button type="button" disabled>
            <FileText aria-hidden="true" />
            Journal
            <span>Sắp có</span>
          </button>
          <button type="button" disabled>
            <MessageSquareQuote aria-hidden="true" />
            Đánh giá
            <span>Sắp có</span>
          </button>
          <p>Hệ thống</p>
          <button type="button" disabled>
            <ImageIcon aria-hidden="true" />
            Thư viện ảnh
          </button>
          <button type="button" disabled>
            <Settings aria-hidden="true" />
            Cài đặt
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink aria-hidden="true" />
            Xem website
          </Link>
          <p>Admin preview · 2026</p>
        </div>
      </aside>

      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <div>
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setSidebarOpen(true)}
              aria-label="Mở menu quản trị"
              aria-expanded={sidebarOpen}
            >
              <Menu aria-hidden="true" />
            </button>
            <div className={styles.breadcrumb}>
              <span>Quản trị</span>
              <span aria-hidden="true">/</span>
              <strong>Banner trang chủ</strong>
            </div>
          </div>
          <div className={styles.topbarActions}>
            <span className={styles.deviceStatus}>
              <span aria-hidden="true" />
              Bản nháp trên thiết bị
            </span>
            <Button asChild variant="outline" size="sm">
              <Link href="/" target="_blank" rel="noopener noreferrer">
                Xem trang chủ
                <ExternalLink aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </header>

        <main className={styles.main} id="admin-main">
          <section className={styles.intro} id="overview" aria-labelledby="admin-title">
            <div>
              <p className={styles.eyebrow}>Content control / 2026</p>
              <h1 id="admin-title">Quản lý banner</h1>
              <p>Thêm, sắp xếp và xem trước carousel trang chủ trong một không gian đồng bộ với Melalogy.</p>
            </div>
            <Button onClick={openAdd} size="lg">
              <Plus aria-hidden="true" />
              Thêm banner
            </Button>
          </section>

          <section className={styles.localNotice} aria-label="Phạm vi lưu dữ liệu">
            <ShieldCheck aria-hidden="true" />
            <div>
              <strong>Đây là bản quản trị cục bộ, chưa phải CMS dùng chung.</strong>
              <p>Thay đổi được lưu trong trình duyệt của thiết bị này và chỉ ảnh hưởng website khi mở trên cùng trình duyệt. Tệp ảnh không được tải lên máy chủ.</p>
            </div>
          </section>

          <section className={styles.stats} aria-label="Tổng quan banner">
            {statItems.map(({ label, value, note, icon: Icon }) => (
              <article className={styles.statCard} key={label}>
                <div>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <p>{note}</p>
                </div>
                <Icon aria-hidden="true" />
              </article>
            ))}
          </section>

          <section className={styles.contentSection} id="banners" aria-labelledby="banner-list-title">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Trang chủ / Carousel</p>
                <h2 id="banner-list-title">Danh sách banner</h2>
                <p>
                  {dirty ? "Có thay đổi chưa được áp dụng." : `Cập nhật gần nhất: ${formatUpdatedAt(updatedAt)}`}
                </p>
              </div>
              <div className={styles.sectionActions}>
                <input
                  ref={importInputRef}
                  type="file"
                  accept="application/json,.json"
                  className={styles.visuallyHidden}
                  onChange={(event) => void importJson(event)}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" aria-label="Mở công cụ dữ liệu">
                      <MoreHorizontal aria-hidden="true" />
                      Công cụ
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={exportJson}>
                      <Download aria-hidden="true" />
                      Xuất JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => importInputRef.current?.click()}>
                      <Upload aria-hidden="true" />
                      Nhập JSON
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setResetOpen(true)}>
                      <RotateCcw aria-hidden="true" />
                      Khôi phục mặc định
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button onClick={() => void applyDrafts()} disabled={!dirty}>
                  <Save aria-hidden="true" />
                  Lưu & áp dụng
                </Button>
              </div>
            </div>

            <div className={styles.bannerList} role="list" aria-label={`${drafts.length} banner trang chủ`}>
              {drafts.length === 0 ? (
                <div className={styles.emptyState}>
                  <ImageIcon aria-hidden="true" />
                  <h3>Chưa có banner</h3>
                  <p>Thêm banner đầu tiên để bắt đầu xây carousel trang chủ.</p>
                  <Button onClick={openAdd}><Plus aria-hidden="true" />Thêm banner</Button>
                </div>
              ) : (
                drafts.map((banner, index) => (
                  <article className={styles.bannerRow} role="listitem" key={banner.id}>
                    <div className={styles.orderHandle} aria-hidden="true">
                      <GripVertical />
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>

                    <button
                      type="button"
                      className={styles.thumbnail}
                      onClick={() => openEdit(banner)}
                      aria-label={`Chỉnh sửa banner ${banner.label}`}
                    >
                      {banner.src ? (
                        <img src={banner.src} alt="" style={{ objectPosition: banner.focus }} />
                      ) : (
                        <ImageIcon aria-hidden="true" />
                      )}
                    </button>

                    <div className={styles.bannerMeta}>
                      <div className={styles.bannerTitleLine}>
                        <button type="button" onClick={() => openEdit(banner)}>{banner.label || "Banner chưa đặt tên"}</button>
                        <span className={banner.enabled ? styles.statusEnabled : styles.statusDisabled}>
                          {banner.enabled ? "Đang hiển thị" : "Đang tắt"}
                        </span>
                      </div>
                      <p>{banner.alt || "Chưa có mô tả ảnh"}</p>
                      <div className={styles.bannerDetails}>
                        <span>{banner.durationMs / 1000}s</span>
                        <span>Focus: {banner.focus}</span>
                        {banner.mobileSrc && <span>Có ảnh mobile</span>}
                        {banner.href && <span>Có liên kết</span>}
                      </div>
                    </div>

                    <div className={styles.rowControls}>
                      <div className={styles.reorderButtons}>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => moveBanner(index, -1)}
                          disabled={index === 0}
                          aria-label={`Đưa ${banner.label} lên trên`}
                        >
                          <ArrowUp aria-hidden="true" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => moveBanner(index, 1)}
                          disabled={index === drafts.length - 1}
                          aria-label={`Đưa ${banner.label} xuống dưới`}
                        >
                          <ArrowDown aria-hidden="true" />
                        </Button>
                      </div>
                      <div className={styles.enableControl}>
                        <Label htmlFor={`banner-toggle-${banner.id}`}>{banner.enabled ? "Bật" : "Tắt"}</Label>
                        <Switch
                          id={`banner-toggle-${banner.id}`}
                          checked={banner.enabled}
                          onCheckedChange={(checked) => toggleBanner(banner.id, checked)}
                          aria-label={`${checkedLabel(banner.enabled)} banner ${banner.label}`}
                        />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon" aria-label={`Thao tác với ${banner.label}`}>
                            <MoreHorizontal aria-hidden="true" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={() => openEdit(banner)}>
                            <Eye aria-hidden="true" />
                            Chỉnh sửa & xem trước
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => duplicateBanner(banner)}>
                            <Copy aria-hidden="true" />
                            Nhân bản
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className={styles.deleteMenuItem} onSelect={() => setPendingDelete(banner)}>
                            <Trash2 aria-hidden="true" />
                            Xóa khỏi bản nháp
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </article>
                ))
              )}
            </div>

            <div className={styles.bottomBar} data-dirty={dirty}>
              <div>
                <span className={styles.bottomBarDot} aria-hidden="true" />
                <div>
                  <strong>{dirty ? "Có thay đổi chưa áp dụng" : "Bản nháp đã đồng bộ"}</strong>
                  <small>{dirty ? "Lưu để xem thay đổi trên trang chủ của thiết bị này." : "Bạn có thể tiếp tục chỉnh sửa bất cứ lúc nào."}</small>
                </div>
              </div>
              <Button onClick={() => void applyDrafts()} disabled={!dirty}>
                <Save aria-hidden="true" />
                Lưu & áp dụng
              </Button>
            </div>
          </section>
        </main>
      </div>

      <BannerEditor
        banner={editorBanner}
        mode={editorMode}
        onClose={() => setEditorBanner(null)}
        onCommit={commitEditor}
      />

      <AlertDialog open={Boolean(pendingDelete)} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa banner khỏi bản nháp?</AlertDialogTitle>
            <AlertDialogDescription>
              “{pendingDelete?.label}” sẽ bị xóa khỏi danh sách đang chỉnh sửa. Thay đổi chỉ có hiệu lực sau khi bạn lưu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Giữ lại</AlertDialogCancel>
            <AlertDialogAction onClick={deleteBanner}>Xóa banner</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Khôi phục banner mặc định?</AlertDialogTitle>
            <AlertDialogDescription>
              Toàn bộ bản nháp trên thiết bị sẽ được thay bằng bộ banner gốc của Melalogy. Hành động này không thể hoàn tác nếu chưa xuất JSON.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={() => void resetToDefaults()}>Khôi phục mặc định</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const checkedLabel = (enabled: boolean) => (enabled ? "Tắt" : "Bật");

export default AdminBannerManager;
