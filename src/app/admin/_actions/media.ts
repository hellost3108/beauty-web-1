"use server";

import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { friendlyError } from "@/lib/admin/server-utils";
import { requireAdminForAction } from "@/lib/auth/admin";
import type { ActionResult } from "@/types/cms";

const MAX_BYTES = 10 * 1024 * 1024;
const TIMEOUT_MS = 12_000;

function isPrivateAddress(address: string) {
  if (isIP(address) === 4) {
    const [a, b] = address.split(".").map(Number);
    return (
      a === 0 || a === 10 || a === 127 || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || a >= 224
    );
  }
  const value = address.toLowerCase();
  if (value.startsWith("::ffff:")) return isPrivateAddress(value.slice(7));
  return value === "::" || value === "::1" || value.startsWith("fc") || value.startsWith("fd") || value.startsWith("fe80");
}

async function assertPublicUrl(raw: string) {
  const url = new URL(raw);
  if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("Đường dẫn ảnh không hợp lệ.");
  if (url.username || url.password) throw new Error("Đường dẫn ảnh không hợp lệ.");
  const addresses = await lookup(url.hostname, { all: true });
  if (!addresses.length || addresses.some((entry) => isPrivateAddress(entry.address))) {
    throw new Error("Không tải được ảnh từ địa chỉ này.");
  }
  return url;
}

/**
 * Downloads an image from another website (Google Docs, a blog…) for the
 * rich text editor, which cannot read it directly because of CORS. Only public
 * http(s) hosts, images only, max 10 MB. The editor then uploads it to the
 * Melalogy storage bucket with the editor's own permissions.
 */
export async function importRemoteImage(source: string): Promise<ActionResult<{ dataUri: string }>> {
  try {
    await requireAdminForAction();
    let url = await assertPublicUrl(source);
    let response: Response | null = null;
    for (let hop = 0; hop < 4; hop += 1) {
      response = await fetch(url, {
        redirect: "manual",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { accept: "image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8" },
        cache: "no-store",
      });
      const location = response.headers.get("location");
      if (response.status >= 300 && response.status < 400 && location) {
        url = await assertPublicUrl(new URL(location, url).toString());
        continue;
      }
      break;
    }
    if (!response || !response.ok) return { ok: false, error: "Không tải được ảnh từ nguồn gốc." };
    const type = (response.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
    if (!type.startsWith("image/") || type.includes("svg")) return { ok: false, error: "Đường dẫn không phải ảnh." };
    const declared = Number(response.headers.get("content-length") ?? 0);
    if (declared > MAX_BYTES) return { ok: false, error: "Ảnh lớn hơn 10 MB." };
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength > MAX_BYTES) return { ok: false, error: "Ảnh lớn hơn 10 MB." };
    return { ok: true, data: { dataUri: `data:${type};base64,${buffer.toString("base64")}` } };
  } catch (error) {
    return { ok: false, error: friendlyError(error) };
  }
}
