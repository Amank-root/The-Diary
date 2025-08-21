"use client"

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {Plus} from 'lucide-react'
import AddButton from '../singleton/AddButton'
import FeedComponent from '../singleton/FeedComponent'

function MainContent() {

  return (
    <div className="max-w-full mx-auto bg-background min-h-screen">
      {/* Stories Section */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-4 overflow-x-auto">
          {/* Add Story */}
          <div className="flex flex-col items-center gap-1 min-w-0">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-dashed border-gray-300">
                <AvatarFallback>
                  <Plus className="w-6 h-6 text-gray-400" />
                </AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs text-center">Your Story</span>
          </div>

          {/* Recent Moods as Stories */}
          {["😊", "🤔", "🥳", "😌", "💪"].map((emoji, index) => (
            <div key={index} className="flex flex-col items-center gap-1 min-w-0">
              <div className="relative">
                <Avatar className="w-16 h-16 border-2 border-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <span className="text-2xl">{emoji}</span>
                  </div>
                </Avatar>
              </div>
              <span className="text-xs text-center">Day {index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <FeedComponent />
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        {/* Write Entry Button */}
        <AddButton />
      </div>
    </div>
  )
}

export default MainContent
