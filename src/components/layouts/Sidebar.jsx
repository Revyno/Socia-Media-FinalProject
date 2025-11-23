import { Home, Compass, Bookmark, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ currentPage, onPageChange }) {
  const {User, logout } = useAuth();
  const Navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Home', value: 'home' },
    { icon: Compass, label: 'Discover', value: 'discover' },
    { icon: Bookmark, label: 'Collections', value: 'collections' },
    { icon: User, label: 'Profile', value: 'profile' },
  ];

  return (
    <aside className="hidden lg:block w-64 h-screen sticky top-0 bg-neutral-900 border-r border-neutral-800 p-6">
      <div className="flex flex-col h-full">
        <nav className="flex-1 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.value}
              onClick={() => onPageChange(item.value)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.value
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="border-t border-neutral-800 pt-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-colors">
            <Settings className="w-6 h-6" />
            <span className="font-medium">Settings</span>
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800/50 transition-colors"
          >
            <LogOut className="w-6 h-6" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}