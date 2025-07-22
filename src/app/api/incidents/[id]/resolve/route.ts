import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../../../lib/supabase'

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    // Find the current incident
    const { data: currentIncident, error: fetchError } = await supabase
      .from('incidents')
      .select(`
        *,
        camera:cameras(*)
      `)
      .eq('id', id)
      .single()

    if (fetchError || !currentIncident) {
      return NextResponse.json(
        { error: 'Incident not found' },
        { status: 404 }
      )
    }

    // Toggle the resolved status
    const { data: updatedIncident, error: updateError } = await supabase
      .from('incidents')
      .update({ resolved: !currentIncident.resolved })
      .eq('id', id)
      .select(`
        *,
        camera:cameras(*)
      `)
      .single()

    if (updateError) {
      console.error('Error updating incident:', updateError)
      return NextResponse.json(
        { error: 'Failed to update incident' },
        { status: 500 }
      )
    }

    return NextResponse.json(updatedIncident)
  } catch (error) {
    console.error('Error updating incident:', error)
    return NextResponse.json(
      { error: 'Failed to update incident' },
      { status: 500 }
    )
  }
}
