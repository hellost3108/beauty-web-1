"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { buttonClass } from "@/components/admin/ui";
import type { ActionResult } from "@/types/cms";

/** Trash icon + confirmation dialog used in the product and article tables. */
export default function DeleteButton({
  label,
  itemName,
  hint,
  onDelete,
}: {
  /** "sản phẩm", "bài viết"… */
  label: string;
  itemName: string;
  hint?: string;
  onDelete: () => Promise<ActionResult>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !pending) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, pending]);

  const confirm = () =>
    startTransition(async () => {
      const result = await onDelete();
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(result.message ?? `Đã xoá ${label}.`);
      setOpen(false);
      router.refresh();
    });

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/10 bg-white text-black/55 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        aria-label={`Xoá ${label}`}
        title={`Xoá ${label}`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => !pending && setOpen(false)}
        >
          <div className="w-full max-w-md rounded-3xl bg-white p-6 text-left shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="grid h-11 w-11 place-items-center rounded-full bg-red-50 text-red-600">
              <Trash2 className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">Xoá {label} này?</h2>
            <p className="mt-2 text-sm leading-6 text-black/60">
              <strong className="text-black">“{itemName}”</strong> sẽ bị xoá vĩnh viễn khỏi Admin và website. Thao tác này không thể hoàn tác.
            </p>
            {hint && <p className="mt-2 text-xs leading-5 text-black/45">{hint}</p>}
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" className={buttonClass.ghost} disabled={pending} onClick={() => setOpen(false)}>
                Huỷ
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={confirm}
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Xoá vĩnh viễn
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
