import type { Metadata } from 'next';
import CmsSections from '@/components/cms/CmsSections';
import { getSection } from '@/lib/cms/server';
import MelaninScience from '@/views/MelaninScience';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSection('science.seo');
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: '/melanin-science' },
  };
}

export default function MelaninSciencePage() {
  return (
    <CmsSections modules={['science']}>
      <MelaninScience />
    </CmsSections>
  );
}
