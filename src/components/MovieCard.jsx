import { useState } from 'react';
import { getImageUrl } from '../api/tmdb';

export default function MovieCard({ movie, isLarge = false, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const posterUrl = getImageUrl(
    isLarge ? movie?.backdrop_path : movie?.poster_path,
    isLarge ? 'original' : 'w500'
  );

  return (
    <div
      className="relative flex-shrink-0 cursor-pointer transition-transform duration-300 ease-out hover:z-10"
      style={{
        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick?.(movie)}
    >
      <img
        src={posterUrl}
        alt={movie?.title || movie?.name || 'Movie'}
        className={`object-cover rounded-md shadow-lg transition-shadow duration-300 ${
          isLarge
            ? 'w-72 md:w-96 h-40 md:h-52'
            : 'w-36 md:w-48 h-52 md:h-72'
        }`}
        style={{
          boxShadow: isHovered ? '0 10px 30px rgba(229, 9, 20, 0.25)' : 'none',
        }}
        loading="lazy"
      />
    </div>
  );
}
