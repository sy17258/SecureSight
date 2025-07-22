import { config } from 'dotenv'
config({ path: '.env.local' })

import { supabase } from '../lib/supabase'

async function seed() {
  try {
    console.log('Starting database seeding...')

    // Clear existing data
    await supabase.from('incidents').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('cameras').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    // Create cameras
    const { data: cameras, error: cameraError } = await supabase
      .from('cameras')
      .insert([
        {
          name: 'Shop Floor A Camera',
          location: 'Shop Floor A',
        },
        {
          name: 'Vault Camera',
          location: 'Vault',
        },
        {
          name: 'Entrance Camera',
          location: 'Entrance',
        }
      ])
      .select()

    if (cameraError) {
      throw cameraError
    }

    console.log('Created cameras:', cameras)

    const [shopFloorA, vault, entrance] = cameras

    // Create incidents spanning 24 hours
    const baseDate = new Date('2025-07-22T00:00:00Z')
    
    const incidents = [
      // Shop Floor A incidents
      {
        camera_id: shopFloorA.id,
        type: 'Unauthorised Access',
        ts_start: new Date(baseDate.getTime() + 1 * 60 * 60 * 1000).toISOString(), // 01:00
        ts_end: new Date(baseDate.getTime() + 1 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString(), // 01:15
        thumbnail_url: '/thumbnail-unauthorized.jpg',
        resolved: false,
      },
      {
        camera_id: shopFloorA.id,
        type: 'Gun Threat',
        ts_start: new Date(baseDate.getTime() + 3 * 60 * 60 * 1000).toISOString(), // 03:00
        ts_end: new Date(baseDate.getTime() + 3 * 60 * 60 * 1000 + 8 * 60 * 1000).toISOString(), // 03:08
        thumbnail_url: '/thumbnail-gun.jpg',
        resolved: false,
      },
      {
        camera_id: shopFloorA.id,
        type: 'Face Recognised',
        ts_start: new Date(baseDate.getTime() + 5 * 60 * 60 * 1000).toISOString(), // 05:00
        ts_end: new Date(baseDate.getTime() + 5 * 60 * 60 * 1000 + 2 * 60 * 1000).toISOString(), // 05:02
        thumbnail_url: '/thumbnail-face.jpg',
        resolved: true,
      },
      {
        camera_id: shopFloorA.id,
        type: 'Unauthorised Access',
        ts_start: new Date(baseDate.getTime() + 6 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // 06:30
        ts_end: new Date(baseDate.getTime() + 6 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString(), // 06:45
        thumbnail_url: '/thumbnail-unauthorized.jpg',
        resolved: false,
      },

      // Vault incidents
      {
        camera_id: vault.id,
        type: 'Unauthorised Access',
        ts_start: new Date(baseDate.getTime() + 7 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // 07:30
        ts_end: new Date(baseDate.getTime() + 7 * 60 * 60 * 1000 + 50 * 60 * 1000).toISOString(), // 07:50
        thumbnail_url: '/thumbnail-unauthorized.jpg',
        resolved: false,
      },
      {
        camera_id: vault.id,
        type: 'Face Recognised',
        ts_start: new Date(baseDate.getTime() + 8 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // 08:30
        ts_end: new Date(baseDate.getTime() + 8 * 60 * 60 * 1000 + 38 * 60 * 1000).toISOString(), // 08:38
        thumbnail_url: '/thumbnail-face.jpg',
        resolved: false,
      },
      {
        camera_id: vault.id,
        type: 'Gun Threat',
        ts_start: new Date(baseDate.getTime() + 10 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // 10:30
        ts_end: new Date(baseDate.getTime() + 10 * 60 * 60 * 1000 + 35 * 60 * 1000).toISOString(), // 10:35
        thumbnail_url: '/thumbnail-gun.jpg',
        resolved: true,
      },
      {
        camera_id: vault.id,
        type: 'Unauthorised Access',
        ts_start: new Date(baseDate.getTime() + 12 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // 12:30
        ts_end: new Date(baseDate.getTime() + 12 * 60 * 60 * 1000 + 42 * 60 * 1000).toISOString(), // 12:42
        thumbnail_url: '/thumbnail-unauthorized.jpg',
        resolved: true,
      },

      // Entrance incidents
      {
        camera_id: entrance.id,
        type: 'Face Recognised',
        ts_start: new Date(baseDate.getTime() + 9 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // 09:30
        ts_end: new Date(baseDate.getTime() + 9 * 60 * 60 * 1000 + 32 * 60 * 1000).toISOString(), // 09:32
        thumbnail_url: '/thumbnail-face.jpg',
        resolved: true,
      },
      {
        camera_id: entrance.id,
        type: 'Traffic Congestion',
        ts_start: new Date(baseDate.getTime() + 13 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // 13:30
        ts_end: new Date(baseDate.getTime() + 13 * 60 * 60 * 1000 + 55 * 60 * 1000).toISOString(), // 13:55
        thumbnail_url: '/thumbnail-traffic.jpg',
        resolved: false,
      },
      {
        camera_id: entrance.id,
        type: 'Face Recognised',
        ts_start: new Date(baseDate.getTime() + 14 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // 14:30
        ts_end: new Date(baseDate.getTime() + 14 * 60 * 60 * 1000 + 33 * 60 * 1000).toISOString(), // 14:33
        thumbnail_url: '/thumbnail-face.jpg',
        resolved: true,
      },
      {
        camera_id: entrance.id,
        type: 'Gun Threat',
        ts_start: new Date(baseDate.getTime() + 16 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // 16:30
        ts_end: new Date(baseDate.getTime() + 16 * 60 * 60 * 1000 + 36 * 60 * 1000).toISOString(), // 16:36
        thumbnail_url: '/thumbnail-gun.jpg',
        resolved: false,
      },
      {
        camera_id: entrance.id,
        type: 'Gun Threat',
        ts_start: new Date(baseDate.getTime() + 19 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // 19:30
        ts_end: new Date(baseDate.getTime() + 19 * 60 * 60 * 1000 + 40 * 60 * 1000).toISOString(), // 19:40
        thumbnail_url: '/thumbnail-gun.jpg',
        resolved: false,
      },
      {
        camera_id: entrance.id,
        type: 'Unauthorised Access',
        ts_start: new Date(baseDate.getTime() + 20 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // 20:30
        ts_end: new Date(baseDate.getTime() + 20 * 60 * 60 * 1000 + 48 * 60 * 1000).toISOString(), // 20:48
        thumbnail_url: '/thumbnail-unauthorized.jpg',
        resolved: true,
      },
      {
        camera_id: entrance.id,
        type: 'Face Recognised',
        ts_start: new Date(baseDate.getTime() + 23 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // 23:30
        ts_end: new Date(baseDate.getTime() + 23 * 60 * 60 * 1000 + 34 * 60 * 1000).toISOString(), // 23:34
        thumbnail_url: '/thumbnail-face.jpg',
        resolved: true,
      }
    ]

    const { data: createdIncidents, error: incidentError } = await supabase
      .from('incidents')
      .insert(incidents)
      .select()

    if (incidentError) {
      throw incidentError
    }

    console.log(`Created ${createdIncidents.length} incidents`)
    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seed()
