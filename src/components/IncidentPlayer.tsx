'use client'

import { Camera } from 'lucide-react'
import { Incident, Camera as CameraType } from '@/types'

interface IncidentPlayerProps {
  currentIncident?: Incident | null
  otherCameras?: CameraType[]
}

export default function IncidentPlayer({ currentIncident, otherCameras = [] }: IncidentPlayerProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg shadow-lg">
      {/* Main Video Player */}
      <div className="w-80 h-60 bg-gray-900 rounded-lg overflow-hidden relative">
        {currentIncident ? (
          <>
            <img
              src={currentIncident.thumbnail_url}
              alt={`${currentIncident.type} incident`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to a placeholder if image fails to load
                e.currentTarget.src = '/placeholder-video.svg'
              }}
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded">
              {currentIncident.camera?.name}
            </div>
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
              LIVE
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Camera size={64} className="opacity-50" />
          </div>
        )}
      </div>

      {/* Camera Thumbnails Strip */}
      <div className="mt-4 flex gap-2">
        {otherCameras.slice(0, 3).map((camera, index) => (
          <div
            key={`camera-thumb-${camera.id}-${index}`}
            className="w-24 h-16 bg-gray-800 rounded border-2 border-gray-600 flex items-center justify-center text-xs text-gray-400 cursor-pointer hover:border-blue-500 transition-colors"
            title={camera.name}
          >
            <Camera size={16} />
          </div>
        ))}
        {otherCameras.length > 3 && (
          <div 
            key="camera-more"
            className="w-24 h-16 bg-gray-800 rounded border-2 border-gray-600 flex items-center justify-center text-xs text-gray-400"
          >
            +{otherCameras.length - 3}
          </div>
        )}
      </div>
    </div>
  )
}
