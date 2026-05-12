import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from '../components/Row';
import MovieModal from '../components/MovieModal';
import {
  fetchTrending,
  fetchTopRated,
  fetchMoviesByGenre,
  searchMovies,
} from '../api/tmdb';

export default function Home() {
  const [movies, setMovies] = useState({
    trending: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadMovies() {
      const [trending, topRated, action, comedy, horror] = await Promise.all([
        fetchTrending(),
        fetchTopRated(),
        fetchMoviesByGenre(28),
        fetchMoviesByGenre(35),
        fetchMoviesByGenre(27),
      ]);
      setMovies({
        trending,
        topRated,
        action,
        comedy,
        horror,
      });
    }
    loadMovies();
  }, []);

  const handleSearch = useCallback(
    async (query) => {
      setSearchQuery(query);
      if (query.length > 2) {
        const results = await searchMovies(query);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    },
    []
  );

  const handleCardClick = useCallback((movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMovie(null), 300);
  }, []);

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar onSearch={handleSearch} />

      <div className="pt-0">
        <Banner onMoreInfo={handleCardClick} />
      </div>

      <div className="relative z-10 -mt-12 md:-mt-24 pb-12">
        <AnimatePresence>
          {searchQuery.length > 2 && (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Row
                title={`Search Results for "${searchQuery}"`}
                movies={searchResults}
                onCardClick={handleCardClick}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Row
          title="Trending Now"
          movies={movies.trending}
          isLarge
          onCardClick={handleCardClick}
        />
        <Row
          title="Top Picks for You"
          movies={movies.topRated}
          onCardClick={handleCardClick}
        />
        <Row
          title="Comedy"
          movies={movies.action}
          onCardClick={handleCardClick}
        />
        <Row
          title="Drama"
          movies={movies.comedy}
          onCardClick={handleCardClick}
        />
        <Row
          title="Family"
          movies={movies.horror}
          onCardClick={handleCardClick}
        />
      </div>

      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
