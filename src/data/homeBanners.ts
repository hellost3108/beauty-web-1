export type HomeBanner = {
  id: string;
  src: string;
  mobileSrc?: string;
  alt: string;
  label: string;
  focus: string;
  enabled: boolean;
  order: number;
  durationMs: number;
  href?: string;
};

export const defaultHomeBanners: HomeBanner[] = [
  {
    id: 'melanin-science',
    src: '/assets/brand-banner-melanin.png',
    alt: 'MELALOGY — The Science of Melanin. Khoa học bắt đầu từ việc hiểu sắc tố.',
    label: 'The science of melanin',
    focus: '60% center',
    enabled: true,
    order: 0,
    durationMs: 6500,
  },
  {
    id: 'pigmentation-science',
    src: '/assets/brand-banner-skincare.png',
    alt: 'Melalogy — thương hiệu khoa học chuyên biệt về sắc tố',
    label: 'Pigmentation science',
    focus: 'center',
    enabled: true,
    order: 1,
    durationMs: 6500,
  },
  {
    id: 'x50-pure-white',
    src: '/assets/brand-banner-x50.png',
    alt: 'Melalogy X50 Pure White — công nghệ dẫn truyền đúng đích',
    label: 'X50® Pure White',
    focus: 'center',
    enabled: true,
    order: 2,
    durationMs: 6500,
  },
  {
    id: 'energy-shot-hydrogel',
    src: '/assets/brand-banner-energy-shot.png',
    alt: 'Melalogy Energy Shot Hydrogel Mask — bộ sưu tập bốn công thức',
    label: 'Energy Shot Hydrogel',
    focus: 'center',
    enabled: true,
    order: 3,
    durationMs: 6500,
  },
];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const cleanText = (value: unknown, fallback = '', maxLength = 240) =>
  typeof value === 'string' && value.trim()
    ? value.trim().slice(0, maxLength)
    : fallback;

const cleanMediaSource = (value: unknown) => {
  if (typeof value !== 'string') return undefined;
  const source = value.trim();
  if (!source || source.length > 4_500_000) return undefined;

  if (
    (source.startsWith('/') && !source.startsWith('//')) ||
    /^https?:\/\//i.test(source) ||
    /^data:image\/(?:avif|gif|jpeg|png|webp);base64,/i.test(source)
  ) {
    return source;
  }

  return undefined;
};

const cleanHref = (value: unknown) => {
  if (typeof value !== 'string') return undefined;
  const href = value.trim();
  if (!href || href.length > 2_048) return undefined;
  return (href.startsWith('/') && !href.startsWith('//')) || /^https?:\/\//i.test(href)
    ? href
    : undefined;
};

const cleanFocus = (value: unknown) => {
  if (typeof value !== 'string') return 'center';
  const focus = value.trim().toLowerCase();
  const position = '(?:left|center|right|top|bottom|(?:100|[0-9]{1,2})(?:\\.[0-9]+)?%)';
  return new RegExp(`^${position}(?:\\s+${position})?$`).test(focus) ? focus : 'center';
};

const cleanDuration = (value: unknown) => {
  const duration = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(duration)) return 6500;
  return Math.round(Math.min(30_000, Math.max(2_500, duration)));
};

/**
 * Turns persisted or externally supplied data into the narrow shape the hero
 * can safely render. Invalid rows are skipped and duplicate ids keep the first
 * valid occurrence so React keys remain stable.
 */
export const sanitizeHomeBanners = (value: unknown): HomeBanner[] => {
  if (!Array.isArray(value)) return [];

  const ids = new Set<string>();
  const result: HomeBanner[] = [];

  value.forEach((entry, index) => {
    if (!isRecord(entry)) return;

    const id = cleanText(entry.id, '', 96);
    const src = cleanMediaSource(entry.src);
    if (!id || !src || ids.has(id)) return;

    ids.add(id);
    const mobileSrc = cleanMediaSource(entry.mobileSrc);
    const href = cleanHref(entry.href);
    const rawOrder = typeof entry.order === 'number' ? entry.order : Number(entry.order);

    result.push({
      id,
      src,
      ...(mobileSrc ? { mobileSrc } : {}),
      alt: cleanText(entry.alt, 'Banner Melalogy'),
      label: cleanText(entry.label, `Banner ${index + 1}`, 96),
      focus: cleanFocus(entry.focus),
      enabled: typeof entry.enabled === 'boolean' ? entry.enabled : true,
      order: Number.isFinite(rawOrder) ? Math.round(rawOrder) : index,
      durationMs: cleanDuration(entry.durationMs),
      ...(href ? { href } : {}),
    });
  });

  return result;
};
