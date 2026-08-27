'use client';

import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

/*
 * Section 2 of the website-edit deck: "chỗ này sẽ chiếu tvc brand".
 * No TVC master has been delivered yet, so the frame renders a poster still
 * until a file lands at /assets/melalogy-tvc-2026.mp4 — drop the file in and
 * the play button starts working with no further code change.
 */
const TVC_SRC = '/assets/melalogy-tvc-2026.mp4';
const POSTER = '/assets/brand-banner-melanin.png';

const BrandFilm = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().then(
      () => setPlaying(true),
      () => setUnavailable(true),
    );
  };

  return (
    <section className="mlg-section mlg-dark" aria-labelledby="mlg-film-title">
      <div className="mlg-shell mlg-rise">
        <p className="mlg-eyebrow mlg-eyebrow--rule">Brand film</p>
        <h2 className="mlg-display" id="mlg-film-title">
          Khoa học sắc tố,
          <em>kể bằng hình ảnh.</em>
        </h2>

        <div className="mlg-film__frame" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
          <video
            ref={videoRef}
            src={TVC_SRC}
            poster={POSTER}
            playsInline
            controls={playing}
            preload="none"
            onError={() => setUnavailable(true)}
            onEnded={() => setPlaying(false)}
            style={{ display: playing ? 'block' : 'none' }}
          />

          {!playing && (
            <>
              <img className="mlg-film__poster" src={POSTER} alt="" aria-hidden="true" />
              <button
                type="button"
                className="mlg-film__play"
                onClick={play}
                aria-label="Phát phim thương hiệu Melalogy"
              >
                <Play aria-hidden="true" />
              </button>
              <div className="mlg-film__note">
                <span>Melalogy · Brand film 2026</span>
                <span>{unavailable ? 'TVC sắp ra mắt' : 'The science of melanin'}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BrandFilm;
