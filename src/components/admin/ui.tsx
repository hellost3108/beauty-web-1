import type { ReactNode } from "react";

/* Shared visual language of the Admin Studio. */

export const inputClass =
  "mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[#191716] outline-none transition placeholder:text-black/30 focus:border-[#f52334] focus:ring-2 focus:ring-[#f52334]/10 disabled:bg-black/[0.03] disabled:text-black/40";
export const labelClass = "block text-sm font-semibold text-black/70";
export const helpClass = "mt-1.5 block text-xs font-normal leading-5 text-black/45";

export const buttonClass = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-full bg-[#f52334] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#d91a2b] disabled:cursor-not-allowed disabled:opacity-50",
  dark:
    "inline-flex items-center justify-center gap-2 rounded-full bg-[#191716] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold text-black/70 transition hover:border-[#f52334] hover:text-[#f52334] disabled:cursor-not-allowed disabled:opacity-50",
  icon:
    "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/10 bg-white text-black/55 transition hover:border-[#f52334] hover:text-[#f52334] disabled:cursor-not-allowed disabled:opacity-40",
  danger:
    "inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50",
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
        {description && <p className="mt-2 max-w-3xl text-sm leading-6 text-black/55">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7 ${className}`}>{children}</section>;
}

const statusStyles: Record<string, string> = {
  published: "bg-emerald-100 text-emerald-800",
  draft: "bg-amber-100 text-amber-800",
  archived: "bg-black/10 text-black/50",
};

export const statusLabels: Record<string, string> = {
  published: "Đang hiển thị",
  draft: "Bản nháp",
  archived: "Lưu trữ",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[status] ?? statusStyles.archived}`}>
      {statusLabels[status] ?? status}
    </span>
  );
}

export function Notice({ tone = "info", children }: { tone?: "info" | "warning" | "error"; children: ReactNode }) {
  const styles = {
    info: "border-sky-200 bg-sky-50 text-sky-900",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    error: "border-red-200 bg-red-50 text-red-800",
  }[tone];
  return <div className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${styles}`}>{children}</div>;
}

export const formatDateTime = (value: string | null | undefined) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

/** "Mặt Nạ Cấp Ẩm" → "mat-na-cap-am" */
export const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
