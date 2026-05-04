import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAppStore } from './contexts/useAppStore';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardHome from './pages/DashboardHome';
import ChatPage from './pages/ChatPage';
import ImagesPage from './pages/ImagesPage';
import BillingPage from './pages/BillingPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const bootstrap = useAppStore((s) => s.bootstrap);
  useEffect(() => { bootstrap(); }, [bootstrap]);
  return <BrowserRouter><Toaster position="top-right" /><Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<AuthPage mode="login" />} />
    <Route path="/signup" element={<AuthPage mode="signup" />} />
    <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      <Route index element={<DashboardHome />} />
      <Route path="chat" element={<ChatPage />} />
      <Route path="images" element={<ImagesPage />} />
      <Route path="billing" element={<BillingPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes></BrowserRouter>;
}
