'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import IncidentPlayer from '@/components/IncidentPlayer'
import IncidentList from '@/components/IncidentList'
import Timeline from '@/components/Timeline'
import { Incident, Camera } from '@/types'

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showTimeline, setShowTimeline] = useState(true)

  // Fetch incidents
  const fetchIncidents = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/incidents')
      if (!response.ok) throw new Error('Failed to fetch incidents')
      
      const data = await response.json()
      setIncidents(data)
      
      // Auto-select the first unresolved incident
      const firstUnresolved = data.find((incident: Incident) => !incident.resolved)
      if (firstUnresolved && !selectedIncident) {
        setSelectedIncident(firstUnresolved)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Resolve incident with optimistic UI
  const handleResolveIncident = async (incidentId: string) => {
    // Optimistic update
    const updatedIncidents = incidents.map(incident =>
      incident.id === incidentId
        ? { ...incident, resolved: true }
        : incident
    )
    setIncidents(updatedIncidents)

    try {
      const response = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: 'PATCH',
      })
      
      if (!response.ok) throw new Error('Failed to resolve incident')
      
      const updatedIncident = await response.json()
      
      // Update with server response
      setIncidents(prev =>
        prev.map(incident =>
          incident.id === incidentId ? updatedIncident : incident
        )
      )
    } catch (err) {
      // Revert optimistic update on error
      setIncidents(incidents)
      console.error('Error resolving incident:', err)
    }
  }

  // Handle incident selection
  const handleSelectIncident = (incident: Incident) => {
    setSelectedIncident(incident)
  }

  useEffect(() => {
    fetchIncidents()
  }, [])

  const unresolvedCount = incidents.filter(incident => !incident.resolved).length
  const cameras = [...new Set(incidents.map(i => i.camera).filter((camera): camera is Camera => Boolean(camera)))].slice(0, 3)

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading SecureSight Dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-red-400 text-lg">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar unresolvedCount={unresolvedCount} />
      
      <div className={`flex flex-col gap-6 p-6 ${showTimeline ? 'h-[calc(100vh-80px)]' : 'h-[calc(100vh-80px)]'}`}>
        {/* Main Content */}
        <div className={`flex gap-6 ${showTimeline ? 'flex-1' : 'h-full'}`}>
          {/* Left Side - Incident Player */}
          <div className="flex-1">
            <IncidentPlayer 
              currentIncident={selectedIncident}
              otherCameras={cameras}
            />
          </div>

          {/* Right Side - Incident List */}
          <div className="w-96">
            <IncidentList
              incidents={incidents}
              selectedIncident={selectedIncident}
              onSelectIncident={handleSelectIncident}
              onResolveIncident={handleResolveIncident}
            />
          </div>
        </div>

        {/* Timeline (Optional/Extra Credit) */}
        {showTimeline && (
          <div className="relative">
            <button
              onClick={() => setShowTimeline(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 text-sm"
            >
              Hide Timeline ✕
            </button>
            <Timeline
              incidents={incidents}
              selectedIncident={selectedIncident}
              onSelectIncident={handleSelectIncident}
            />
          </div>
        )}

        {/* Show Timeline Button */}
        {!showTimeline && (
          <div className="text-center">
            <button
              onClick={() => setShowTimeline(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              Show Timeline
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
