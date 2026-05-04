import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function AuthPage({ mode }) {
  const isSignup = mode === 'signup';
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    if (isSignup && form.password !== form.confirmPassword) return toast.error('Passwords mismatch');
    const fn = isSignup ? supabase.auth.signUp : supabase.auth.signInWithPassword;
    const { data, error } = await fn({ email: form.email, password: form.password });
    if (error) return toast.error(error.message);
    if (isSignup && data.user) await supabase.from('users').upsert({ id: data.user.id, email: form.email, credits_balance: 2 });
    toast.success(isSignup ? 'Signup successful' : 'Welcome back');
    navigate('/dashboard');
  };
  return <div className="min-h-screen grid place-items-center p-6"><form onSubmit={submit} className="w-full max-w-md space-y-4 bg-slate-900 p-6 rounded-xl border border-slate-800"><h2 className="text-2xl font-bold">{isSignup ? 'Create account' : 'Login'}</h2>{['email','password', ...(isSignup?['confirmPassword']:[])].map((k)=><input key={k} type={k.includes('password')?'password':'email'} required placeholder={k} className="w-full p-3 rounded bg-slate-800" onChange={(e)=>setForm({...form,[k]:e.target.value})} />)}<button className="w-full bg-lumora-green p-3 rounded">{isSignup ? 'Sign Up' : 'Login'}</button><p className="text-sm">{isSignup ? 'Already have an account?' : "Don't have an account?"} <Link className="text-lumora-gold" to={isSignup?'/login':'/signup'}>{isSignup?'Login':'Sign up'}</Link></p></form></div>;
}
