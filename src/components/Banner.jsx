import { useEffect, useState } from 'react';
import { Play, Info, VolumeX } from 'lucide-react';
import { fetchTrending, getImageUrl } from '../api/tmdb';

export default function Banner({ onMoreInfo }) {
  const [movie, setMovie] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    async function load() {
      const results = await fetchTrending();
      if (results?.length) {
        const random = results[Math.floor(Math.random() * results.length)]
        setMovie(random);
      }
    }
    load();
  }, []);

  if (!movie) return null;

  const backdrop = getImageUrl(movie.backdrop_path, 'original');
  const title = movie?.title || movie?.name || movie?.original_title || 'Featured';

  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdrop})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/70 via-[#141414]/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/60 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 pb-16 md:pb-24 px-4 md:px-14">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-3 md:mb-5 max-w-3xl tracking-wide"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        >
          {title}
        </h1>
        <p className="text-sm md:text-xl text-gray-100 mb-5 md:mb-8 max-w-xl line-clamp-3 font-normal"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}
        >
          {movie.overview}
        </p>
        <div className="flex gap-3 md:gap-4 mb-3">
          <button className="flex items-center gap-2 bg-white text-black px-6 md:px-10 py-2 md:py-3 rounded font-bold text-sm md:text-lg hover:bg-gray-200 transition-colors">
            <Play className="w-5 h-5 md:w-6 md:h-6 fill-black" />
            Play
          </button>
          <button
            onClick={() => onMoreInfo?.(movie)}
            className="flex items-center gap-2 bg-[#6d6d6d]/80 text-white px-6 md:px-10 py-2 md:py-3 rounded font-bold text-sm md:text-lg hover:bg-[#6d6d6d]/60 transition-colors"
          >
            <Info className="w-5 h-5 md:w-6 md:h-6" />
            More Info
          </button>
        </div>

        <p className="text-sm md:text-base text-gray-300 italic"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}
        >
          Because you watched The Big Bang Theory
        </p>
      </div>

      <div className="absolute bottom-16 md:bottom-24 right-4 md:right-14 flex items-center gap-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          <VolumeX className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="bg-[#2a2a2a]/80 border-l-4 border-white px-3 py-1.5 text-sm text-white font-medium">
          U/A 13+
        </div>
      </div>

      <div className="absolute bottom-4 right-4 md:right-14 flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-0.5 rounded-full transition-all duration-300 ${
              i === 0 ? 'w-6 bg-white' : 'w-4 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
