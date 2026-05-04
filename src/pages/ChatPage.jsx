import { useState } from 'react';
import toast from 'react-hot-toast';
import { fakeImages } from '../data/plans';
import { useAppStore } from '../contexts/useAppStore';
import { supabase } from '../lib/supabase';

export default function ChatPage(){
  const [prompt,setPrompt]=useState(''); const [items,setItems]=useState([]); const [loading,setLoading]=useState(false);
  const {credits,user,updateCredits}=useAppStore();
  const generate = async ()=>{ if (!prompt) return; if (credits<1) return toast.error('Insufficient credits'); setLoading(true); const imageUrl=fakeImages[Math.floor(Math.random()*fakeImages.length)]+'?'+Date.now(); const row={user_id:user.id,prompt,image_url:imageUrl,status:'completed'}; await supabase.from('generated_images').insert(row); await updateCredits(-1); setItems([...items,{prompt,imageUrl}]); setPrompt(''); toast.success('Image generated'); setLoading(false); };
  return <div className="space-y-4"><div className="bg-slate-900 rounded p-4 h-96 overflow-y-auto">{items.map((i,idx)=><div key={idx} className="mb-4"><p className="mb-2 text-slate-300">{i.prompt}</p><img src={i.imageUrl} className="rounded-lg max-w-sm"/></div>)}</div><div className="flex gap-2"><input value={prompt} onChange={(e)=>setPrompt(e.target.value)} className="flex-1 bg-slate-800 rounded p-3" placeholder="Describe an image or edit request..."/><button onClick={generate} disabled={loading} className="bg-lumora-green px-5 rounded">{loading?'Generating...':'Generate'}</button></div></div>
}
