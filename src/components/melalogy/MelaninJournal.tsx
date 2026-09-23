'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useSection } from '@/components/cms/SectionsProvider';
import type { Article } from '@/lib/cms/types';
import styles from './MelaninJournal.module.css';

/*
 * Section 4 of the website-edit deck: "Blog", presented as The Melanin
 * Journal — content pillar 01/02 first (guideline 13, Content system).
 */
const MelaninJournal = ({ posts }: { posts: Article[] }) => {
  const content = useSection('home.journal');
  const featured = posts.slice(0, Math.max(1, content.count));
  if (featured.length === 0) return null;

  return (
    <section
      className={`mlg-section mlg-dark ${styles.section}`}
      aria-labelledby="mlg-journal-title"
    >
      <div className="mlg-shell mlg-rise">
        <div className="mlg-section-head">
          <div>
            <p className="mlg-eyebrow mlg-eyebrow--rule">{content.eyebrow}</p>
            <h2
              className={`mlg-display mlg-display--sm ${styles.title}`}
              id="mlg-journal-title"
            >
              <span className={styles.titleLead}>{content.title}</span>
              {content.titleAccent && <em>{content.titleAccent}</em>}
            </h2>
          </div>
          <Link href="/blog" className={`mlg-link ${styles.allLink}`}>
            {content.allLinkLabel}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div
          className={`mlg-journal ${styles.rail}`}
          role="region"
          aria-label={`${featured.length} bài viết nổi bật, cuộn ngang để xem từng bài`}
          tabIndex={0}
        >
          {featured.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`mlg-article ${styles.card}`}
              aria-label={`Bài ${index + 1} trên ${featured.length}: ${post.title}`}
            >
              <div className="mlg-article__media">
                <img src={post.image} alt={post.imageAlt} loading="lazy" />
              </div>
              <div className="mlg-article__body">
                <span className="mlg-article__cat">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MelaninJournal;
