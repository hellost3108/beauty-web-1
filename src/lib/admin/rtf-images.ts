/*
 * Microsoft Word (Mac and Windows) puts pictures on the clipboard only inside
 * the RTF flavour; the HTML flavour just points at temporary `file://` paths
 * the browser cannot read. This pulls the PNG/JPEG pictures out of the RTF in
 * document order so they can replace those `file://` images one by one.
 */

// Same approach as CKEditor's "paste from Office": a Word picture is a
// {\pict …\bliptagNNN …<hex data>} group. Pictures without \bliptag are the
// legacy \nonshppict metafile duplicates and are skipped.
const PICTURE_HEADER = /{\\pict[\s\S]+?\\bliptag-?\d+(\\blipupi-?\d+)?({\\\*\\blipuid\s?[\da-fA-F]+)?[\s}]*?/;
const PICTURE = new RegExp(`(?:(${PICTURE_HEADER.source}))([\\da-fA-F\\s]+)\\}`, "g");

function hexToBytes(hex: string) {
  const bytes = new Uint8Array(Math.floor(hex.length / 2));
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = parseInt(hex.substr(index * 2, 2), 16);
  }
  return bytes;
}

export type RtfImage = { file: File | null };

/**
 * Returns one entry per Word picture, in order. Pictures in formats the web
 * cannot show (EMF/WMF) are returned as `{ file: null }` so the order still
 * lines up with the <img> tags in the HTML flavour.
 */
export function extractRtfImages(rtf: string): RtfImage[] {
  if (!rtf || !rtf.includes("\\pict")) return [];
  const matches = rtf.match(PICTURE) ?? [];
  return matches.map((picture, index) => {
    const type = picture.includes("\\pngblip") ? "image/png" : picture.includes("\\jpegblip") ? "image/jpeg" : null;
    if (!type) return { file: null };
    const hex = picture.replace(PICTURE_HEADER, "").replace(/[^\da-fA-F]/g, "");
    if (hex.length < 64) return { file: null };
    const bytes = hexToBytes(hex);
    return { file: new File([bytes], `word-image-${index + 1}.${type === "image/png" ? "png" : "jpg"}`, { type }) };
  });
}
