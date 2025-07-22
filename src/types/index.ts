export interface Camera {
  id: string
  name: string
  location: string
  created_at: string
  updated_at: string
}

export interface Incident {
  id: string
  camera_id: string
  camera?: Camera
  type: IncidentType
  ts_start: string
  ts_end: string
  thumbnail_url: string
  resolved: boolean
  created_at: string
  updated_at: string
}

export type IncidentType = 
  | 'Unauthorised Access'
  | 'Gun Threat'
  | 'Face Recognised'
  | 'Traffic Congestion'
