import { Link, Outlet, useLocation } from 'react-router-dom';
import { Image, CreditCard, MessageCircle, User, Home } from 'lucide-react';
import { useAppStore } from '../contexts/useAppStore';

const links = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/dashboard/chat', label: 'Chat / Generate', icon: MessageCircle },
  { to: '/dashboard/images', label: 'My Images', icon: Image },
  { to: '/dashboard/billing', label: 'Credits & Billing', icon: CreditCard },
  { to: '/dashboard/profile', label: 'Profile', icon: User },
];

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { credits, signOut } = useAppStore();
  return <div className="min-h-screen md:flex bg-slate-950">
    <aside className="md:w-64 border-r border-slate-800 p-4">
      <h2 className="text-xl font-bold text-lumora-gold mb-4">Lumora AI</h2>
      <p className="mb-4 text-sm">Credits: <span className="text-lumora-green">{credits}</span></p>
      <nav className="space-y-1">{links.map(({to,label,icon:Icon}) => <Link key={to} to={to} className={`flex items-center gap-2 p-2 rounded ${pathname===to?'bg-slate-800':'hover:bg-slate-900'}`}><Icon size={16}/>{label}</Link>)}</nav>
      <button onClick={signOut} className="mt-6 w-full bg-red-600 px-3 py-2 rounded">Logout</button>
    </aside>
    <main className="flex-1 p-6"><Outlet /></main>
  </div>;
}
