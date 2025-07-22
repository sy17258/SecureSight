import { createClient } from '@supabase/supabase-js'

// Load environment variables for scripts (Next.js handles this automatically in app)
if (typeof window === 'undefined') {
  require('dotenv').config({ path: '.env.local' })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
