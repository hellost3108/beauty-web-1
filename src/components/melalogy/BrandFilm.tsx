'use client';

import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { useSection } from '@/components/cms/SectionsProvider';

/*
 * Section 2 of the website-edit deck: "chỗ này sẽ chiếu tvc brand".
 * Video URL, poster and copy are edited in Admin → Trang chủ → Brand film.
 * Until a playable file exists the frame shows the poster still.
 */
const BrandFilm = () => {
  const film = useSection('home.film');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const play = () => {
    const video = videoRef.current;
    if (!video || !film.videoUrl) {
      setUnavailable(true);
      return;
    }
    video.play().then(
      () => setPlaying(true),
      () => setUnavailable(true),
    );
  };

  return (
    <section className="mlg-section mlg-dark mlg-film-section" aria-labelledby="mlg-film-title">
      <div className="mlg-shell mlg-rise">
        <p className="mlg-eyebrow mlg-eyebrow--rule">{film.eyebrow}</p>
        <h2 className="mlg-display" id="mlg-film-title">
          {film.title}
          {film.titleAccent && <em>{film.titleAccent}</em>}
        </h2>

        <div className="mlg-film__frame">
          <video
            ref={videoRef}
            src={film.videoUrl || undefined}
            poster={film.poster || undefined}
            playsInline
            controls={playing}
            preload="none"
            onError={() => setUnavailable(true)}
            onEnded={() => setPlaying(false)}
            style={{ display: playing ? 'block' : 'none' }}
          />

          {!playing && (
            <>
              {film.poster && (
                <img className="mlg-film__poster" src={film.poster} alt="" aria-hidden="true" />
              )}
              <button
                type="button"
                className="mlg-film__play"
                onClick={play}
                aria-label="Phát phim thương hiệu Melalogy"
              >
                <Play aria-hidden="true" />
              </button>
              <div className="mlg-film__note">
                <span>{film.noteLeft}</span>
                <span>{unavailable || !film.videoUrl ? film.noteUnavailable : film.noteRight}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BrandFilm;
