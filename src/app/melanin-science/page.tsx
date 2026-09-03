import type { Metadata } from 'next';
import MelaninScience from '@/views/MelaninScience';

export const metadata: Metadata = {
  title: 'Melanin Science',
  description:
    'Khám phá nền tảng Melanin + Dermalogy, ba trụ cột khoa học và công nghệ dẫn truyền đúng đích định hình Melalogy.',
  alternates: { canonical: '/melanin-science' },
};

export default function MelaninSciencePage() {
  return <MelaninScience />;
}
