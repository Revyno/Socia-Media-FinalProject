import { Home, Compass, Bookmark, User as UserIcon, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar({ currentPage, onPageChange }) {
  const { user: currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Fallback handler jika onPageChange tidak provided
  const handlePageChange = (page) => {
    if (onPageChange && typeof onPageChange === 'function') {
      onPageChange(page);
    } else {
      // Default navigation
      const routes = {
        home: '/',
        discover: '/discover',
        collections: '/collections',
        profile: '/profile',
        settings: '/settings'
      };
      navigate(routes[page] || '/');
    }
  };

  // Fallback untuk currentPage jika tidak provided
  const getCurrentPage = () => {
    if (currentPage) return currentPage;
    
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/discover') return 'discover';
    if (path === '/collections') return 'collections';
    if (path === '/profile') return 'profile';
    if (path.startsWith('/profile/edit')) return 'profile';
    if (path.startsWith('/user/')) return 'profile';
    if (path === '/settings') return 'settings';
    return 'home';
  };

  const menuItems = [
    { icon: Home, label: 'Home', value: 'home' },
    { icon: Compass, label: 'Discover', value: 'discover' },
    { icon: Bookmark, label: 'Collections', value: 'collections' },
    { icon: UserIcon, label: 'Profile', value: 'profile' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <aside className="hidden lg:block w-64 h-screen sticky top-0 bg-neutral-900 border-r border-neutral-800 p-6">
      <div className="flex flex-col h-full">
        {/* User Info */}
        {currentUser && (
          <div className="mb-6 p-4 bg-neutral-800 rounded-lg">
            <div className="flex items-center gap-3">
              {currentUser.profilePictureUrl ? (
                <img 
                  src={currentUser.profilePictureUrl} 
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-neutral-400" />
                </div>
              )}
              <div>
                <p className="text-white font-medium text-sm">{currentUser.name}</p>
                <p className="text-neutral-400 text-xs">@{currentUser.username}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.value}
              onClick={() => handlePageChange(item.value)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                getCurrentPage() === item.value
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
          <button 
            onClick={handleSettings}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-colors"
          >
            <Settings className="w-6 h-6" />
            <span className="font-medium">Settings</span>
          </button>
          <button
            onClick={handleLogout}
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