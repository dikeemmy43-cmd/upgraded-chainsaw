# Lumora AI (React + Vite)

Production-ready frontend for AI image generation simulation.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env`.
3. Run SQL in Supabase: `setup.sql`.
4. `npm run dev`

## Features
- Supabase auth
- Protected dashboard
- Simulated AI chat image generation
- Paystack credit purchase (client-side simulation)
- My images gallery and profile update

## Deploy Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Add env vars in Netlify dashboard.

## Security note
Paystack success is simulated on client now. Add server-side webhook verification via Supabase Edge Functions before production.
