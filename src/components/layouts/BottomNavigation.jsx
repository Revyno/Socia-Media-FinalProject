import { Grid, Compass, Bookmark, User } from 'lucide-react';

export default function BottomNavigation({ currentPage, onPageChange }) {
  const navItems = [
    { icon: Grid, label: 'Home', value: 'home' },
    { icon: Compass, label: 'Discover', value: 'discover' },
    { icon: Bookmark, label: 'Collections', value: 'collections' },
    { icon: User, label: 'Profile', value: 'profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-neutral-900/95 backdrop-blur-sm border-t border-neutral-800 z-50 lg:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-around">
        {navItems.map(item => (
          <button
            key={item.value}
            onClick={() => onPageChange(item.value)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentPage === item.value ? 'text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <item.icon className={`w-6 h-6 ${currentPage === item.value ? 'fill-current' : ''}`} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}