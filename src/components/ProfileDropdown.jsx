import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Pencil, UserPlus, User, HelpCircle } from 'lucide-react';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const profiles = [
    { name: 'Siddhi', color: '#F5C518', icon: '🙂' },
    { name: 'Kids', color: '#0072F5', icon: '👶' },
  ];

  const menuItems = [
    { icon: Pencil, label: 'Manage Profiles' },
    { icon: UserPlus, label: 'Transfer Profile' },
    { icon: User, label: 'Account' },
    { icon: HelpCircle, label: 'Help Centre' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className="w-8 h-8 bg-[#F5C518] rounded flex items-center justify-center text-sm">
          🙂
        </div>
        <ChevronDown
          className={`w-4 h-4 text-white transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-[#000000ea] border border-white/10 rounded shadow-2xl py-2 z-50">
          {profiles.map((profile) => (
            <div
              key={profile.name}
              className="flex items-center gap-3 px-4 py-2 hover:underline cursor-pointer text-gray-300 hover:text-white text-sm"
            >
              <div
                className="w-8 h-8 rounded flex items-center justify-center text-sm"
                style={{ backgroundColor: profile.color }}
              >
                {profile.icon}
              </div>
              <span>{profile.name}</span>
            </div>
          ))}

          <div className="my-2 border-t border-white/10" />

          {menuItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-4 py-2 hover:underline cursor-pointer text-gray-300 hover:text-white text-sm"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </div>
          ))}

          <div className="my-2 border-t border-white/10" />

          <div className="px-4 py-2 text-center text-sm text-gray-300 hover:text-white hover:underline cursor-pointer">
            Sign out of Netflix
          </div>
        </div>
      )}
    </div>
  );
}
