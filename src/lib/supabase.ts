import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nrmpplhkntvnmeeespzy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ybXBwbGhrbnR2bm1lZWVzcHp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1ODQ5MDAsImV4cCI6MjA1MTE2MDkwMH0.3GHD_IGN4I-y-KhvfXDGK1uVBrdScMeEaH9cxYFRhhg';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});