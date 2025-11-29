import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoadingSpinner from './components/common/LoadingSpinner';

// Layout
import MainLayout from './components/layouts/MainLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Main Pages
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import CollectionsPage from './pages/CollectionsPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import UserDetailPage from './pages/UserDetailPage';
import NotFoundPage from './pages/NotFoundPage';

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Function untuk handle page change dari Sidebar
  const handlePageChange = (page) => {
    const routes = {
      home: '/',
      discover: '/discover',
      collections: '/collections',
      profile: '/profile'
    };
    navigate(routes[page] || '/');
  };

  // Get current page dari URL pathname
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/discover') return 'discover';
    if (path === '/collections') return 'collections';
    if (path === '/profile') return 'profile';
    if (path.startsWith('/profile/edit')) return 'profile';
    if (path.startsWith('/user/')) return 'profile';
    return 'home';
  };

  // Render children routes with layout dan berikan props
  return (
    <MainLayout 
      currentPage={getCurrentPage()} 
      onPageChange={handlePageChange}
    >
      <Outlet />
    </MainLayout>
  );
}

function PublicRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <LoadingSpinner />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render children routes
  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Redirect ke home jika sudah login */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected Routes - Redirect ke login jika belum auth */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/user/:userId" element={<UserDetailPage />} />
          
          {/* Tambahkan routes baru di sini */}
          <Route path="/settings" element={<div className="p-6 text-white">Settings Page - Coming Soon</div>} />
          <Route path="/notifications" element={<div className="p-6 text-white">Notifications Page - Coming Soon</div>} />
        </Route>

        {/* Error Routes */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}