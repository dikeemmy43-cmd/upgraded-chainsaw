import { Navigate } from 'react-router-dom';
import { useAppStore } from '../contexts/useAppStore';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAppStore();
  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
