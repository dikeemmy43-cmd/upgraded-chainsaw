import { Link } from 'react-router-dom';

export default function LandingPage() {
  return <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
    <header className="p-6 flex justify-between"><h1 className="font-bold text-2xl text-lumora-gold">Lumora AI</h1><div className="space-x-3"><Link to="/login">Login</Link><Link to="/signup" className="bg-lumora-green px-4 py-2 rounded">Sign Up</Link></div></header>
    <section className="max-w-5xl mx-auto px-6 py-20 text-center"><h2 className="text-5xl font-bold mb-4">Create Realistic Images with AI</h2><p className="text-slate-300 mb-10">Premium AI generation & editing with Nigerian-inspired style.</p><Link to="/signup" className="bg-lumora-gold text-slate-900 px-6 py-3 rounded-lg font-semibold">Get Started</Link></section>
  </div>;
}
