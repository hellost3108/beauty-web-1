'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  defaultHomeBanners,
  sanitizeHomeBanners,
  type HomeBanner,
} from '@/data/homeBanners';

const STORAGE_KEY = 'melalogy.site-content.v1';
const DOCUMENT_VERSION = 1;

type SaveResult = { ok: boolean; error?: string };

type SiteContentContextValue = {
  banners: HomeBanner[];
  ready: boolean;
  updatedAt: string | null;
  saveBanners: (next: HomeBanner[]) => SaveResult;
  resetBanners: () => SaveResult;
};

type StoredSiteContent = {
  version: typeof DOCUMENT_VERSION;
  updatedAt: string;
  banners: HomeBanner[];
};

const cloneDefaults = () => defaultHomeBanners.map((banner) => ({ ...banner }));

const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined);

const readDocument = (raw: string | null) => {
  if (!raw) return { banners: cloneDefaults(), updatedAt: null };

  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      Array.isArray(parsed) ||
      !('version' in parsed) ||
      parsed.version !== DOCUMENT_VERSION ||
      !('banners' in parsed) ||
      !Array.isArray(parsed.banners)
    ) {
      return { banners: cloneDefaults(), updatedAt: null };
    }

    const updatedAt =
      'updatedAt' in parsed && typeof parsed.updatedAt === 'string'
        ? parsed.updatedAt
        : null;

    return {
      banners: sanitizeHomeBanners(parsed.banners),
      updatedAt,
    };
  } catch {
    return { banners: cloneDefaults(), updatedAt: null };
  }
};

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [banners, setBanners] = useState<HomeBanner[]>(cloneDefaults);
  const [ready, setReady] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    const applyStoredDocument = (raw: string | null) => {
      const next = readDocument(raw);
      setBanners(next.banners);
      setUpdatedAt(next.updatedAt);
      setReady(true);
    };

    applyStoredDocument(window.localStorage.getItem(STORAGE_KEY));

    const handleStorage = (event: StorageEvent) => {
      if (event.storageArea === window.localStorage && event.key === STORAGE_KEY) {
        applyStoredDocument(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const saveBanners = useCallback((next: HomeBanner[]): SaveResult => {
    const sanitized = sanitizeHomeBanners(next);
    if (sanitized.length !== next.length) {
      return {
        ok: false,
        error: 'Có banner thiếu mã hoặc hình ảnh hợp lệ. Vui lòng kiểm tra lại.',
      };
    }

    const nextUpdatedAt = new Date().toISOString();
    const document: StoredSiteContent = {
      version: DOCUMENT_VERSION,
      updatedAt: nextUpdatedAt,
      banners: sanitized,
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(document));
      setBanners(sanitized);
      setUpdatedAt(nextUpdatedAt);
      setReady(true);
      return { ok: true };
    } catch {
      return {
        ok: false,
        error: 'Không thể lưu nội dung. Hình ảnh có thể quá lớn hoặc bộ nhớ trình duyệt đã đầy.',
      };
    }
  }, []);

  const resetBanners = useCallback((): SaveResult => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      setBanners(cloneDefaults());
      setUpdatedAt(null);
      setReady(true);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Không thể khôi phục banner mặc định.' };
    }
  }, []);

  const value = useMemo<SiteContentContextValue>(
    () => ({ banners, ready, updatedAt, saveBanners, resetBanners }),
    [banners, ready, resetBanners, saveBanners, updatedAt],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
