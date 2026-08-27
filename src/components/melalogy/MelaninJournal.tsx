import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/melalogyBlogPosts';

/*
 * Section 4 of the website-edit deck: "Blog", presented as The Melanin
 * Journal — content pillar 01/02 first (guideline 13, Content system).
 */
const MelaninJournal = () => {
  const featured = blogPosts.slice(0, 4);

  return (
    <section className="mlg-section mlg-dark" aria-labelledby="mlg-journal-title">
      <div className="mlg-shell mlg-rise">
        <div className="mlg-section-head">
          <div>
            <p className="mlg-eyebrow mlg-eyebrow--rule">The melanin journal</p>
            <h2 className="mlg-display mlg-display--sm" id="mlg-journal-title">
              Hiểu cơ chế
              <em>trước khi thêm một bước chăm sóc.</em>
            </h2>
          </div>
          <Link href="/blog" className="mlg-link">
            Xem tất cả bài viết
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="mlg-journal">
          {featured.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="mlg-article">
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
