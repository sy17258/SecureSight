'use client'

import { Camera, Shield, Users, Bell } from 'lucide-react'

interface NavbarProps {
  unresolvedCount: number
}

export default function Navbar({ unresolvedCount }: NavbarProps) {
  return (
    <nav className="bg-slate-900 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">SecureSight</h1>
            <p className="text-xs text-gray-400">CCTV Monitoring Dashboard</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-600 rounded-lg text-white">
              <Bell className="w-4 h-4" />
              <span className="font-medium">{unresolvedCount}</span>
              <span>Incidents</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-300">
              <Camera className="w-4 h-4" />
              <span>3 Cameras</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>All Systems Online</span>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-700">
            <div className="text-right text-sm">
              <div className="text-white font-medium">Shivam Yadav</div>
              <div className="text-gray-400">Security Officer</div>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
