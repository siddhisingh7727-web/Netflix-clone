import { useEffect, useRef, useState } from 'react';
import { Search, Bell } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

function NetflixLogo() {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
      alt="Netflix"
      className="w-24 md:w-32 h-auto"
      draggable={false}
    />
  );
}

export default function Navbar({ onSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const navLinks = ['Home', 'Shows', 'Movies', 'Games', 'New & Popular', 'My List', 'Browse by Languages'];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-14 h-16 md:h-[68px]">
        <div className="flex items-center gap-5 md:gap-6">
          <a href="/" className="flex-shrink-0">
            <NetflixLogo />
          </a>

          <ul className="hidden lg:flex items-center gap-5 text-sm text-gray-300">
            {navLinks.map((link) => (
              <li
                key={link}
                className="cursor-pointer hover:text-gray-100 transition-colors"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 md:gap-5">
          <div className="relative flex items-center">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white hover:text-gray-300 transition-colors p-1"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <div
              className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-black/80 border border-white/30 rounded overflow-hidden transition-all duration-300 ${
                searchOpen ? 'w-48 md:w-64 opacity-100' : 'w-0 opacity-0 border-transparent'
              }`}
            >
              <Search className="w-4 h-4 text-gray-400 ml-3 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Titles, people, genres"
                className="bg-transparent text-white text-sm py-2 px-3 w-full outline-none placeholder-gray-400"
              />
            </div>
          </div>

          <a
            href="#"
            className="text-white hover:text-gray-300 transition-colors text-sm font-medium hidden md:block"
          >
            Children
          </a>

          <button className="text-white hover:text-gray-300 transition-colors p-1">
            <Bell className="w-5 h-5" />
          </button>

          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}
