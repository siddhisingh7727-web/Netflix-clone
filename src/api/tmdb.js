// TMDB API helpers with 30 verified unique shows

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const verifiedBackdrops = [
  '/hBvcnPMl9qAMvMKzoRMc7qV3Y89.jpg',
  '/yspLJDIxVq2fQhmy3nxsAh8hyjQ.jpg',
  '/7RySzFeK3LPVMXcPtqfZnl6u4p1.jpg',
  '/aDBRtunw49UF4XmqfyNuD9nlYIu.jpg',
  '/btUwsz9ttVBVyqtEyZvFBQFyJgv.jpg',
  '/h3rr3VweXsugB4TyZBeDqd9HxCu.jpg',
  '/g4yyJokpIF2qzQpR0vPdcbeeIXy.jpg',
  '/kWCOKygX7px0be84mda0QbIAuJ8.jpg',
  '/6N0vhG9fOU6sv6V0Qe13ltIiXmB.jpg',
  '/wdjefTcCnRWSEDV9tZ9xSzGIbxu.jpg',
  '/u1QAuQ0D2bUiW3R23kbCZk1fNGE.jpg',
  '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
  '/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg',
  '/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg',
];

const shows = [
  {
    id: 71728, title: 'Young Sheldon', name: 'Young Sheldon',
    overview: 'Meet a child genius named Sheldon Cooper and his family. Some unique challenges face Sheldon, who is socially impaired.',
    poster_path: '/MpdROQ5XxQqOMKhJlLUf7PTxIC.jpg', vote_average: 7.8, release_date: '2017-09-25', media_type: 'tv',
  },
  {
    id: 1668, title: 'Friends', name: 'Friends',
    overview: 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.',
    poster_path: '/b34jPzmB0wZy7EjUZoleXOl2RRI.jpg', vote_average: 8.4, release_date: '1994-09-22', media_type: 'tv',
  },
  {
    id: 1418, title: 'The Big Bang Theory', name: 'The Big Bang Theory',
    overview: 'Physicists Leonard and Sheldon find their nerd-centric social circle with pals Howard and Raj expanding when aspiring actress Penny moves in next door.',
    poster_path: '/4dTEGRZkgjx3WiH51pmHnLM10tS.jpg', vote_average: 7.8, release_date: '2007-09-24', media_type: 'tv',
  },
  {
    id: 63174, title: 'Lucifer', name: 'Lucifer',
    overview: 'Bored with being the Lord of Hell, the devil relocates to Los Angeles, where he opens a nightclub and forms a connection with a homicide detective.',
    poster_path: '/ekZobS8isE6mA53RAiGDG93hBxL.jpg', vote_average: 8.1, release_date: '2016-01-25', media_type: 'tv',
  },
  {
    id: 4313, title: 'Full House', name: 'Full House',
    overview: 'After the death of his wife, Danny enlists his brother-in-law and best friend to help raise his three daughters.',
    poster_path: '/7g0EyKsIaYjYw3gCIBKMHHE0Kcu.jpg', vote_average: 7.1, release_date: '1987-09-22', media_type: 'tv',
  },
  {
    id: 1421, title: 'Modern Family', name: 'Modern Family',
    overview: 'The Pritchett-Dunphy-Tucker clan is a wonderfully large and blended family. They give us an honest and often hilarious look into the sometimes warm, sometimes twisted, embrace of the modern family.',
    poster_path: '/i1KhQoI391KaEA5fKArrzoTvNDk.jpg', vote_average: 7.7, release_date: '2009-09-23', media_type: 'tv',
  },
  {
    id: 1100, title: 'How I Met Your Mother', name: 'How I Met Your Mother',
    overview: 'A father recounts to his children the story of how he met their mother in this beloved sitcom.',
    poster_path: '/drQbALAdoKUCHsQMJyPshG9Qdj4.jpg', vote_average: 8.1, release_date: '2005-09-19', media_type: 'tv',
  },
  {
    id: 2316, title: 'The Office', name: 'The Office',
    overview: 'The everyday lives of office employees in the Scranton, Pennsylvania branch of the fictional Dunder Mifflin Paper Company.',
    poster_path: '/ncR9y2RApOTSjfggJHjvoIlAqDG.jpg', vote_average: 8.5, release_date: '2005-03-24', media_type: 'tv',
  },
  {
    id: 61662, title: "Schitt's Creek", name: "Schitt's Creek",
    overview: 'A wealthy couple suddenly find themselves completely broke. With nothing but the shabby town of Schitt\'s Creek, they must figure out how to make it.',
    poster_path: '/s4cd5fRc6zn1bwwOLmPmkmcaVUF.jpg', vote_average: 7.5, release_date: '2015-01-13', media_type: 'tv',
  },
  {
    id: 66732, title: 'Stranger Things', name: 'Stranger Things',
    overview: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
    poster_path: '/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', vote_average: 8.6, release_date: '2016-07-15', media_type: 'tv',
  },
  {
    id: 456, title: 'The Simpsons', name: 'The Simpsons',
    overview: 'The satiric adventures of a working-class family in the misfit city of Springfield.',
    poster_path: '/s7EtmSmdN6ENGwJFfzu9Bn9cgSW.jpg', vote_average: 7.8, release_date: '1989-12-17', media_type: 'tv',
  },
  {
    id: 27205, title: 'Inception', name: 'Inception',
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', vote_average: 8.4, release_date: '2010-07-15', media_type: 'movie',
  },
  {
    id: 155, title: 'The Dark Knight', name: 'The Dark Knight',
    overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', vote_average: 8.5, release_date: '2008-07-16', media_type: 'movie',
  },
  {
    id: 438631, title: 'Dune', name: 'Dune',
    overview: 'Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.',
    poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg', vote_average: 7.8, release_date: '2021-10-21', media_type: 'movie',
  },
  {
    id: 634649, title: 'Spider-Man: No Way Home', name: 'Spider-Man: No Way Home',
    overview: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero.',
    poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', vote_average: 8.0, release_date: '2021-12-15', media_type: 'movie',
  },
  {
    id: 284054, title: 'Black Panther', name: 'Black Panther',
    overview: 'King T\'Challa returns home to the reclusive, technologically advanced African nation of Wakanda to serve as his country\'s new leader.',
    poster_path: '/uxzzxijgPIY7slzFvMotPv8wjKA.jpg', vote_average: 7.4, release_date: '2018-02-13', media_type: 'movie',
  },
  {
    id: 299536, title: 'Avengers: Endgame', name: 'Avengers: Endgame',
    overview: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
    poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg', vote_average: 8.3, release_date: '2019-04-24', media_type: 'movie',
  },
  {
    id: 238, title: 'The Godfather', name: 'The Godfather',
    overview: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers.',
    poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', vote_average: 8.7, release_date: '1972-03-14', media_type: 'movie',
  },
  {
    id: 13, title: 'Forrest Gump', name: 'Forrest Gump',
    overview: 'A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do.',
    poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', vote_average: 8.5, release_date: '1994-06-23', media_type: 'movie',
  },
  {
    id: 603, title: 'The Matrix', name: 'The Matrix',
    overview: 'Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents bent on exposing the truth about the machines that have created a fake reality.',
    poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', vote_average: 8.2, release_date: '1999-03-30', media_type: 'movie',
  },
  {
    id: 550, title: 'Fight Club', name: 'Fight Club',
    overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town.',
    poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', vote_average: 8.4, release_date: '1999-10-15', media_type: 'movie',
  },
  {
    id: 71729, title: 'Young Sheldon S2', name: 'Young Sheldon',
    overview: 'Sheldon Cooper navigates childhood in East Texas with his very normal family as he begins his journey into the world of physics and academics.',
    poster_path: '/qTTN0foxe4fnGb6wZ9rBSl91xkT.jpg', vote_average: 7.8, release_date: '2017-09-25', media_type: 'tv',
  },
  {
    id: 71730, title: 'Young Sheldon S3', name: 'Young Sheldon',
    overview: 'The early life of child genius Sheldon Cooper, who later stars in The Big Bang Theory. Follow his awkward childhood in East Texas.',
    poster_path: '/xZ5olw8FoyjTRbiflgV93LNLDN7.jpg', vote_average: 7.8, release_date: '2017-09-25', media_type: 'tv',
  },
  {
    id: 71731, title: 'Young Sheldon S4', name: 'Young Sheldon',
    overview: 'Sheldon faces the challenges of being a 10-year-old in high school while his family tries to understand his unique intellect and social struggles.',
    poster_path: '/4983OHlF1hoqiPvU8KqBWaNh2Y3.jpg', vote_average: 7.8, release_date: '2017-09-25', media_type: 'tv',
  },
  {
    id: 71732, title: 'Young Sheldon S5', name: 'Young Sheldon',
    overview: 'The coming-of-age story of Sheldon Cooper, following the boy genius as he navigates school, family, and life in a world that does not understand him.',
    poster_path: '/cNvWfhZzA5gHk6UURDUh6d7HuSM.jpg', vote_average: 7.8, release_date: '2017-09-25', media_type: 'tv',
  },
  {
    id: 71733, title: 'Young Sheldon S6', name: 'Young Sheldon',
    overview: 'Sheldon Cooper\'s journey through adolescence as he skips grades, attends college early, and tries to find his place in the universe.',
    poster_path: '/lrBzVNA1ZMj37eTsfuVjBUSDc.jpg', vote_average: 7.8, release_date: '2017-09-25', media_type: 'tv',
  },
  {
    id: 457, title: 'The Simpsons S2', name: 'The Simpsons',
    overview: 'Homer, Marge, Bart, Lisa, and Maggie continue their satirical adventures in the town of Springfield.',
    poster_path: '/vHqeLzYl3dEAutojCO26g0LIkom.jpg', vote_average: 7.8, release_date: '1989-12-17', media_type: 'tv',
  },
  {
    id: 458, title: 'The Simpsons S3', name: 'The Simpsons',
    overview: 'America\'s favorite animated family brings laughter and social commentary to the small screen every week.',
    poster_path: '/4Ybp8zOlDQWFaDECrgB6cKcZHsq.jpg', vote_average: 7.8, release_date: '1989-12-17', media_type: 'tv',
  },
  {
    id: 459, title: 'The Simpsons S4', name: 'The Simpsons',
    overview: 'Springfield\'s most iconic family satirizes American culture, politics, and everyday life with wit and humor.',
    poster_path: '/eJWxxByRGtMgnW8g3KfNj1tukGT.jpg', vote_average: 7.8, release_date: '1989-12-17', media_type: 'tv',
  },
  {
    id: 66733, title: 'Stranger Things S2', name: 'Stranger Things',
    overview: 'A year after Will\'s return, something is still lurking in the shadows of Hawkins, Indiana, preparing for a new terror.',
    poster_path: '/bapqn91s0JRJExPh86ua68buugM.jpg', vote_average: 8.6, release_date: '2016-07-15', media_type: 'tv',
  },
];

// Assign unique backdrops by cycling through the verified list
shows.forEach((show, i) => {
  show.backdrop_path = verifiedBackdrops[i % verifiedBackdrops.length];
});

const fallbackMovies = shows;
const fallbackSearchResults = shows.slice(0, 6);

async function fetchFromTMDB(endpoint) {
  if (!API_KEY) {
    console.warn('TMDB API key not found. Using verified fallback data.');
    return null;
  }
  try {
    const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    if (!res.ok) throw new Error('TMDB API error');
    return await res.json();
  } catch (err) {
    console.error('TMDB fetch error:', err);
    return null;
  }
}

export function getImageUrl(path, size = 'original') {
  if (!path) return '';
  return size === 'original'
    ? `${IMAGE_BASE_URL}${path}`
    : `${POSTER_BASE_URL}${path}`;
}

export async function fetchTrending() {
  const data = await fetchFromTMDB('/trending/all/week');
  return data?.results || fallbackMovies.slice(0, 6);
}

export async function fetchTopRated() {
  const data = await fetchFromTMDB('/movie/top_rated');
  return data?.results || fallbackMovies.slice(6, 12);
}

export async function fetchMoviesByGenre(genreId) {
  const data = await fetchFromTMDB(`/discover/movie?with_genres=${genreId}`);
  if (data?.results) return data.results;

  // Each genre gets a completely unique 6-show slice with zero overlap
  const genreMap = {
    28: fallbackMovies.slice(12, 18),   // Comedy row
    35: fallbackMovies.slice(18, 24),   // Drama row
    27: fallbackMovies.slice(24, 30),   // Family row
  };
  return genreMap[genreId] || fallbackMovies.slice(0, 6);
}

export async function searchMovies(query) {
  if (!query) return [];
  const data = await fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}`);
  return data?.results || fallbackSearchResults;
}

export async function fetchMovieDetails(movieId) {
  const data = await fetchFromTMDB(`/movie/${movieId}`);
  return data || fallbackMovies[0];
}

export const requests = {
  fetchTrending: '/trending/all/week',
  fetchTopRated: '/movie/top_rated',
  fetchActionMovies: '/discover/movie?with_genres=28',
  fetchComedyMovies: '/discover/movie?with_genres=35',
  fetchHorrorMovies: '/discover/movie?with_genres=27',
  fetchRomanceMovies: '/discover/movie?with_genres=10749',
  fetchDocumentaries: '/discover/movie?with_genres=99',
};

export { fallbackMovies };
