import { useEffect, useState } from 'react';
import { useAppStore } from '../contexts/useAppStore';
import { supabase } from '../lib/supabase';

export default function ImagesPage(){ const {user}=useAppStore(); const [images,setImages]=useState([]); useEffect(()=>{(async()=>{const {data}=await supabase.from('generated_images').select('*').eq('user_id',user.id).order('created_at',{ascending:false}); setImages(data||[]);})();},[user]); return <div><h2 className="text-2xl font-bold mb-4">My Images</h2><div className="grid md:grid-cols-3 gap-4">{images.map(img=><div key={img.id} className="bg-slate-900 rounded p-3"><img src={img.image_url} className="rounded mb-2"/><p className="text-sm">{img.prompt}</p><a href={img.image_url} download className="text-lumora-gold text-sm">Download</a></div>)}</div></div>}
