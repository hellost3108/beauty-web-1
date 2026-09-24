/*
 * Whitelist of inline CSS that rich text may keep (from the editor toolbar or
 * content pasted from Word / Google Docs). Used both in the browser (paste
 * clean-up) and on the server (sanitizeHtml) so the rules cannot drift.
 * Everything else — positioning, fonts that do not exist on the web, Word's
 * mso-* properties, url(), expressions — is dropped.
 */

const COLOR = /^(#[0-9a-f]{3,8}|rgba?\(\s*[\d.]+%?\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*(,\s*[\d.]+%?\s*)?\)|[a-z]{3,20})$/i;
const LENGTH = /^\d{1,3}(\.\d{1,2})?(px|pt|em|rem|%)$/i;

const PT_TO_PX = 96 / 72;

/** "11pt" → "15px"; other units untouched. Returns null if not a sane size. */
function normalizeFontSize(value: string): string | null {
  const match = value.trim().match(/^(\d{1,3}(?:\.\d+)?)(px|pt|em|rem|%)$/i);
  if (!match) return null;
  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();
  if (unit === "pt") return `${Math.round(amount * PT_TO_PX)}px`;
  if (unit === "px") return amount >= 8 && amount <= 120 ? `${Math.round(amount)}px` : null;
  if (unit === "%") return amount >= 50 && amount <= 600 ? `${amount}%` : null;
  return amount >= 0.5 && amount <= 8 ? `${amount}${unit}` : null;
}

const isNeutralColor = (value: string) =>
  /^(#000(000)?|black|windowtext|rgb\(\s*0\s*,\s*0\s*,\s*0\s*\)|inherit|initial|auto|currentcolor)$/i.test(value.trim());
const isNeutralBackground = (value: string) =>
  /^(#fff(fff)?|white|transparent|window|rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)|rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)|inherit|initial|none)$/i.test(
    value.trim(),
  );

type Rule = (value: string) => string | null;

const rules: Record<string, Rule> = {
  color: (value) => (COLOR.test(value) && !isNeutralColor(value) ? value : null),
  "background-color": (value) => (COLOR.test(value) && !isNeutralBackground(value) ? value : null),
  background: (value) => (COLOR.test(value) && !isNeutralBackground(value) ? value : null),
  "font-size": (value) => normalizeFontSize(value),
  "font-weight": (value) => (/^(bold|bolder|[5-9]00)$/i.test(value) ? value : null),
  "font-style": (value) => (/^italic$/i.test(value) ? "italic" : null),
  "text-decoration": (value) => (/^(underline|line-through)( (underline|line-through))?$/i.test(value) ? value : null),
  "text-decoration-line": (value) => (/^(underline|line-through)( (underline|line-through))?$/i.test(value) ? value : null),
  "text-align": (value) => (/^(center|right|justify)$/i.test(value) ? value.toLowerCase() : null),
  "line-height": (value) => (/^\d(\.\d{1,2})?$/.test(value) || LENGTH.test(value) ? value : null),
  "vertical-align": (value) => (/^(super|sub)$/i.test(value) ? value : null),
};

/** Returns a safe `style` attribute value (possibly empty). */
export function filterStyle(style: string): string {
  if (!style || /url\(|expression|javascript:|@import|behavior|[<>]/i.test(style)) return "";
  const kept: string[] = [];
  for (const declaration of style.split(";")) {
    const index = declaration.indexOf(":");
    if (index < 0) continue;
    const property = declaration.slice(0, index).trim().toLowerCase();
    const value = declaration
      .slice(index + 1)
      .replace(/!important/gi, "")
      .trim()
      .replace(/^"|"$/g, "");
    const rule = rules[property];
    if (!rule || !value) continue;
    const cleaned = rule(value);
    if (cleaned) kept.push(`${property === "background" ? "background-color" : property}: ${cleaned}`);
  }
  return kept.join("; ");
}
