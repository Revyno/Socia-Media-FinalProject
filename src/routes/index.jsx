import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

// Main Pages
import HomePage from '@/pages/HomePage';
import DiscoverPage from '@/pages/DiscoverPage';
import CollectionsPage from '@/pages/CollectionsPage';
import ProfilePage from '@/pages/ProfilePage';
import EditProfilePage from '@/pages/EditProfilePage';
import UserDetailPage from '@/pages/UserDetailPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Layout
import MainLayout from '@/components/layout/MainLayout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
        <Routes>
          {/* Public Routes - Only accessible when NOT logged in */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* Protected Routes - Only accessible when logged in */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <HomePage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/discover"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <DiscoverPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/collections"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <CollectionsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProfilePage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <EditProfilePage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/user/:userId"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <UserDetailPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
}