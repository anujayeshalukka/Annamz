import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase URL and Anon Key
// You can find these in your Supabase Project Settings > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'YOUR_SUPABASE_URL' 
  ? import.meta.env.VITE_SUPABASE_URL 
  : 'https://placeholder.supabase.co'
  
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY && import.meta.env.VITE_SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY'
  ? import.meta.env.VITE_SUPABASE_ANON_KEY
  : 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
