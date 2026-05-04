import { Link } from 'react-router-dom';
import { useAppStore } from '../contexts/useAppStore';
export default function DashboardHome(){ const {profile,credits}=useAppStore(); return <div><h1 className="text-3xl font-bold mb-2">Hi {profile?.full_name || profile?.email}</h1><p className="mb-6">You have <span className="text-lumora-green">{credits}</span> credits.</p><Link to="/dashboard/billing" className="bg-lumora-gold text-slate-900 px-4 py-2 rounded">Quick Buy Credits</Link></div>}
