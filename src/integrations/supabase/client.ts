
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://acxjwosguginmhfwdhks.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjeGp3b3NndWdpbW1oZndkaGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNDUzMjksImV4cCI6MjA2MzkyMTMyOX0.jXRshIDoyGg5G1qCBgau36FTBdRjmQkkVoISPZi1bko'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
  global: {
    headers: {
      'x-client-info': 'supabase-js-web/2.49.8'
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Test connectivity on initialization
if (typeof window !== 'undefined') {
  supabase.from('app_users').select('count', { count: 'exact', head: true })
    .then(({ error }) => {
      if (error) {
        console.error('Supabase connection test failed:', error)
      } else {
        console.log('Supabase connection test successful')
      }
    })
}
