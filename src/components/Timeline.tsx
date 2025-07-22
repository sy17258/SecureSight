'use client'

import { useState, useRef, useEffect } from 'react'
import { Incident } from '@/types'
import { formatTimeRange, getIncidentTypeColor } from '@/utils/incident'

interface TimelineProps {
  incidents: Incident[]
  selectedIncident?: Incident | null
  onSelectIncident: (incident: Incident) => void
}

export default function Timeline({ incidents, selectedIncident, onSelectIncident }: TimelineProps) {
  const [scrubberPosition, setScrubberPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const timelineRef = useRef<SVGSVGElement>(null)

  const timelineWidth = 800
  const timelineHeight = 80
  const hourWidth = timelineWidth / 24 // 24 hours

  // Handle scrubber drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateScrubberPosition(e)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateScrubberPosition(e as any)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const updateScrubberPosition = (e: React.MouseEvent | MouseEvent) => {
    if (!timelineRef.current) return
    
    const rect = timelineRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(timelineWidth, e.clientX - rect.left))
    setScrubberPosition(x)
    
    // Find the nearest incident to the scrubber position
    const scrubberHour = (x / hourWidth)
    const nearestIncident = findNearestIncident(scrubberHour)
    if (nearestIncident) {
      onSelectIncident(nearestIncident)
    }
  }

  const findNearestIncident = (targetHour: number): Incident | null => {
    if (incidents.length === 0) return null
    
    let nearest = incidents[0]
    let minDistance = Infinity
    
    incidents.forEach(incident => {
      const incidentHour = new Date(incident.ts_start).getHours() + 
                          new Date(incident.ts_start).getMinutes() / 60
      const distance = Math.abs(incidentHour - targetHour)
      
      if (distance < minDistance) {
        minDistance = distance
        nearest = incident
      }
    })
    
    return nearest
  }

  // Convert incident time to timeline position
  const getIncidentPosition = (incident: Incident) => {
    const startTime = new Date(incident.ts_start)
    const hour = startTime.getHours() + startTime.getMinutes() / 60
    return hour * hourWidth
  }

  const getIncidentWidth = (incident: Incident) => {
    const start = new Date(incident.ts_start)
    const end = new Date(incident.ts_end)
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60) // hours
    return Math.max(2, duration * hourWidth) // minimum 2px width
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  // Update scrubber position when selected incident changes
  useEffect(() => {
    if (selectedIncident && !isDragging) {
      const position = getIncidentPosition(selectedIncident)
      setScrubberPosition(position)
    }
  }, [selectedIncident, isDragging])

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-white text-lg font-semibold mb-4">24-Hour Incident Timeline</h3>
      
      <div className="relative">
        <svg
          ref={timelineRef}
          width={timelineWidth}
          height={timelineHeight}
          className="border border-gray-600 rounded cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          {/* Timeline background */}
          <rect
            width={timelineWidth}
            height={timelineHeight}
            fill="#374151"
            className="rounded"
          />
          
          {/* Hour markers */}
          {Array.from({ length: 25 }, (_, i) => (
            <g key={i}>
              <line
                x1={i * hourWidth}
                y1={0}
                x2={i * hourWidth}
                y2={timelineHeight}
                stroke="#6B7280"
                strokeWidth={i % 6 === 0 ? 2 : 1}
                opacity={i % 6 === 0 ? 1 : 0.5}
              />
              {i % 6 === 0 && (
                <text
                  x={i * hourWidth}
                  y={timelineHeight - 5}
                  fill="#9CA3AF"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {i.toString().padStart(2, '0')}:00
                </text>
              )}
            </g>
          ))}
          
          {/* Incident markers */}
          {incidents.map((incident, index) => {
            const x = getIncidentPosition(incident)
            const width = getIncidentWidth(incident)
            const isSelected = selectedIncident?.id === incident.id
            
            return (
              <g key={incident.id}>
                <rect
                  x={x}
                  y={20}
                  width={width}
                  height={25}
                  fill={`url(#gradient-${incident.type.replace(/\s+/g, '-')})`}
                  stroke={isSelected ? '#3B82F6' : 'transparent'}
                  strokeWidth={isSelected ? 2 : 0}
                  className="cursor-pointer hover:opacity-80"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectIncident(incident)
                  }}
                />
                
                {/* Incident type indicator */}
                <circle
                  cx={x + width / 2}
                  cy={32.5}
                  r={4}
                  fill="white"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectIncident(incident)
                  }}
                />
              </g>
            )
          })}
          
          {/* Scrubber line */}
          <line
            x1={scrubberPosition}
            y1={0}
            x2={scrubberPosition}
            y2={timelineHeight}
            stroke="#3B82F6"
            strokeWidth={3}
            className="pointer-events-none"
          />
          
          {/* Scrubber handle */}
          <circle
            cx={scrubberPosition}
            cy={10}
            r={6}
            fill="#3B82F6"
            stroke="white"
            strokeWidth={2}
            className="cursor-grab active:cursor-grabbing"
          />
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradient-Unauthorised-Access" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F97316" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#EA580C" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="gradient-Gun-Threat" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#DC2626" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="gradient-Face-Recognised" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="gradient-Traffic-Congestion" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Current time indicator */}
        <div
          className="absolute top-0 text-xs text-blue-400 transform -translate-x-1/2 pointer-events-none"
          style={{ left: `${scrubberPosition}px` }}
        >
          {Math.floor(scrubberPosition / hourWidth).toString().padStart(2, '0')}:
          {Math.floor(((scrubberPosition / hourWidth) % 1) * 60).toString().padStart(2, '0')}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-gray-300">Unauthorised Access</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-300">Gun Threat</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-300">Face Recognised</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-300">Traffic Congestion</span>
        </div>
      </div>
    </div>
  )
}
