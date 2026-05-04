import { creditPlans } from '../data/plans';
import { initializePayment } from '../lib/paystack';
import { useAppStore } from '../contexts/useAppStore';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function BillingPage(){ const {user,updateCredits}=useAppStore();
  const buy=(plan)=> initializePayment({email:user.email,amount:plan.price,metadata:{plan:plan.id},onSuccess: async (trx)=>{ await updateCredits(plan.credits); await supabase.from('transactions').insert({user_id:user.id,amount:plan.price,currency:'NGN',status:'success',reference:trx.reference,metadata:plan}); toast.success('Payment success. Credits added.');},onCancel:()=>toast('Payment canceled')});
  return <div><h2 className="text-2xl font-bold mb-6">Credits & Billing</h2><div className="grid md:grid-cols-2 gap-4">{creditPlans.map(p=><div key={p.id} className="bg-slate-900 border border-slate-800 rounded p-5"><h3 className="text-xl font-semibold">{p.title}</h3><p className="text-lumora-gold text-2xl my-2">₦{p.price.toLocaleString()}</p><p className="text-slate-400">{p.description}</p><button onClick={()=>buy(p)} className="mt-4 bg-lumora-green px-4 py-2 rounded">Buy now</button></div>)}</div></div> }
