import { useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useAppStore } from '../contexts/useAppStore';

export default function ProfilePage(){ const {profile,user,fetchProfile}=useAppStore(); const [full_name,setName]=useState(profile?.full_name||''); const save=async()=>{await supabase.from('users').update({full_name}).eq('id',user.id); toast.success('Profile updated'); fetchProfile();}; return <div className="max-w-lg"><h2 className="text-2xl font-bold mb-4">Profile</h2><input value={full_name} onChange={(e)=>setName(e.target.value)} className="w-full p-3 bg-slate-800 rounded" placeholder="Full name"/><button onClick={save} className="mt-3 bg-lumora-green px-4 py-2 rounded">Save</button></div> }
