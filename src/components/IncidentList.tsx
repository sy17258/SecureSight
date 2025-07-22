'use client'

import { useState } from 'react'
import { Check, Clock } from 'lucide-react'
import { Incident } from '@/types'
import { getIncidentTypeColor, getIncidentTypeIcon, formatTimeRange } from '@/utils/incident'

interface IncidentListProps {
  incidents: Incident[]
  selectedIncident?: Incident | null
  onSelectIncident: (incident: Incident) => void
  onResolveIncident: (incidentId: string) => Promise<void>
}

export default function IncidentList({
  incidents,
  selectedIncident,
  onSelectIncident,
  onResolveIncident,
}: IncidentListProps) {
  const [resolvingIncidents, setResolvingIncidents] = useState<Set<string>>(new Set())

  const handleResolve = async (e: React.MouseEvent, incidentId: string) => {
    e.stopPropagation()
    setResolvingIncidents(prev => new Set([...prev, incidentId]))
    
    try {
      await onResolveIncident(incidentId)
    } finally {
      setResolvingIncidents(prev => {
        const newSet = new Set(prev)
        newSet.delete(incidentId)
        return newSet
      })
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex-shrink-0">
        <h2 className="text-xl font-bold text-white mb-2">
          {incidents.filter(i => !i.resolved).length} Unresolved Incidents
        </h2>
        <div className="text-sm text-gray-400">
          {incidents.filter(i => i.resolved).length} resolved incidents
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 min-h-0 max-h-[400px]">
        {incidents.map((incident) => {
          const isSelected = selectedIncident?.id === incident.id
          const isResolving = resolvingIncidents.has(incident.id)
          const isResolved = incident.resolved
          
          return (
            <div
              key={incident.id}
              className={`
                p-4 rounded-lg border cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-900/20' 
                  : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800/80'
                }
                ${isResolved ? 'opacity-60' : ''}
              `}
              onClick={() => onSelectIncident(incident)}
            >
              <div className="flex items-start gap-3">
                {/* Incident Type Icon */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium
                  ${getIncidentTypeColor(incident.type as any)}
                `}>
                  {getIncidentTypeIcon(incident.type as any)}
                </div>

                {/* Incident Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`
                      text-sm font-medium
                      ${isResolved ? 'text-gray-400 line-through' : 'text-white'}
                    `}>
                      {incident.type}
                    </h3>
                    {isResolved && (
                      <Check size={16} className="text-green-500 flex-shrink-0" />
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-400 mb-1">
                    📍 {incident.camera?.location}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={12} />
                    {formatTimeRange(new Date(incident.ts_start), new Date(incident.ts_end))}
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="w-16 h-12 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={incident.thumbnail_url}
                    alt={incident.type}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-thumbnail.svg'
                    }}
                  />
                </div>
              </div>

              {/* Resolve Button */}
              {!isResolved && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <button
                    onClick={(e) => handleResolve(e, incident.id)}
                    disabled={isResolving}
                    className={`
                      w-full py-2 px-3 rounded text-sm font-medium transition-colors
                      ${isResolving
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                      }
                    `}
                  >
                    {isResolving ? 'Resolving...' : 'Resolve'}
                  </button>
                </div>
              )}
            </div>
          )
        })}

        {incidents.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <div className="text-lg mb-2">No incidents found</div>
            <div className="text-sm">All clear! 🎉</div>
          </div>
        )}
      </div>
    </div>
  )
}
