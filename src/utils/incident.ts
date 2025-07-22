import { IncidentType } from '@/types'

export const getIncidentTypeColor = (type: IncidentType): string => {
  switch (type) {
    case 'Unauthorised Access':
      return 'bg-orange-500'
    case 'Gun Threat':
      return 'bg-red-500'
    case 'Face Recognised':
      return 'bg-blue-500'
    case 'Traffic Congestion':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

export const getIncidentTypeIcon = (type: IncidentType): string => {
  switch (type) {
    case 'Unauthorised Access':
      return '🚫'
    case 'Gun Threat':
      return '🔫'
    case 'Face Recognised':
      return '👤'
    case 'Traffic Congestion':
      return '🚦'
    default:
      return '⚠️'
  }
}

export const formatTimeRange = (start: Date, end: Date): string => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }
  
  return `${formatTime(start)} - ${formatTime(end)}`
}
