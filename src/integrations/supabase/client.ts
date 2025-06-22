
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://acxjwosgugimmhfwdhks.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjeGp3b3NndWdpbW1oZndkaGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNDUzMjksImV4cCI6MjA2MzkyMTMyOX0.jXRshIDoyGg5G1qCBgau36FTBdRjmQkkVoISPZi1bko'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})
