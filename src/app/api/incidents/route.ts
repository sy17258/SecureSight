import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Check if we're in build mode with placeholder values
    if (process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
      return NextResponse.json({ 
        message: 'Build mode - Supabase not configured',
        incidents: [] 
      })
    }

    const { searchParams } = new URL(request.url)
    const resolved = searchParams.get('resolved')

    let query = supabase
      .from('incidents')
      .select(`
        *,
        camera:cameras(*)
      `)
      .order('ts_start', { ascending: false })

    if (resolved !== null) {
      query = query.eq('resolved', resolved === 'true')
    }

    const { data: incidents, error } = await query

    if (error) {
      console.error('Error fetching incidents:', error)
      return NextResponse.json(
        { error: 'Failed to fetch incidents' },
        { status: 500 }
      )
    }

    return NextResponse.json(incidents)
  } catch (error) {
    console.error('Error fetching incidents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch incidents' },
      { status: 500 }
    )
  }
}
