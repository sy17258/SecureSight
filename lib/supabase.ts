import { createClient } from '@supabase/supabase-js'

// Load environment variables for scripts (Next.js handles this automatically in app)
if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
  try {
    require('dotenv').config({ path: '.env.local' })
  } catch (error) {
    // Dotenv not available in production builds, that's okay
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'

// Don't create client with placeholder values during build
if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseServiceKey === 'placeholder_key') {
  console.warn('Supabase client initialized with placeholder values - this is expected during build time')
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
