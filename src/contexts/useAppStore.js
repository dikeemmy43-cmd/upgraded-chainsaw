import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useAppStore = create((set, get) => ({
  user: null,
  profile: null,
  credits: 0,
  loading: true,
  setUser: (user) => set({ user }),
  bootstrap: async () => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user ?? null;
    set({ user });
    if (user) await get().fetchProfile();
    set({ loading: false });
  },
  fetchProfile: async () => {
    const user = get().user;
    if (!user) return;
    const { data } = await supabase.from('users').select('*').eq('id', user.id).single();
    if (data) set({ profile: data, credits: data.credits_balance ?? 0 });
  },
  updateCredits: async (delta) => {
    const { user, credits } = get();
    const next = Math.max(0, credits + delta);
    await supabase.from('users').update({ credits_balance: next }).eq('id', user.id);
    set({ credits: next });
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null, credits: 0 });
  },
}));
