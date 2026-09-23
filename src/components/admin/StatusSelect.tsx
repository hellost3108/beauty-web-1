"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ActionResult, PublicationStatus } from "@/types/cms";

const options: Array<{ value: PublicationStatus; label: string }> = [
  { value: "published", label: "Đang hiển thị" },
  { value: "draft", label: "Bản nháp" },
  { value: "archived", label: "Lưu trữ" },
];

const tone: Record<PublicationStatus, string> = {
  published: "border-emerald-200 bg-emerald-50 text-emerald-800",
  draft: "border-amber-200 bg-amber-50 text-amber-800",
  archived: "border-black/10 bg-black/5 text-black/55",
};

/** Inline status switcher used in the product and article tables. */
export default function StatusSelect({
  value,
  onChange,
}: {
  value: PublicationStatus;
  onChange: (status: PublicationStatus) => Promise<ActionResult>;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(value);
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      aria-label="Trạng thái"
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold outline-none ${tone[status]}`}
      onChange={(event) => {
        const next = event.target.value as PublicationStatus;
        const previous = status;
        setStatus(next);
        startTransition(async () => {
          const result = await onChange(next);
          if (!result.ok) {
            setStatus(previous);
            toast.error(result.error);
          } else {
            toast.success("Đã cập nhật trạng thái.");
            router.refresh();
          }
        });
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
