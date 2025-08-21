"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Bell, Calendar, MessageSquare, User } from 'lucide-react'

function MobileNotifications() {
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New Message',
      content: 'You have a new message from John',
      time: '2 min ago',
      icon: MessageSquare,
      unread: true
    },
    {
      id: 2,
      type: 'calendar',
      title: 'Meeting Reminder',
      content: 'Team meeting starts in 30 minutes',
      time: '30 min ago',
      icon: Calendar,
      unread: true
    },
    {
      id: 3,
      type: 'user',
      title: 'Profile Update',
      content: 'Your profile has been updated successfully',
      time: '1 hour ago',
      icon: User,
      unread: false
    }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 text-xs p-0 flex items-center justify-center"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
              <Badge variant="secondary" className="ml-auto">
                {unreadCount}
              </Badge>
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
            <div className="space-y-1">
              {notifications.map((notification, index) => {
                const Icon = notification.icon
                return (
                  <div key={notification.id}>
                    <div className={`p-3 rounded-lg transition-colors hover:bg-accent cursor-pointer ${
                      notification.unread ? 'bg-accent/50' : ''
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full flex-shrink-0 ${
                          notification.unread 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <Icon className="h-3 w-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium truncate">
                              {notification.title}
                            </p>
                            {notification.unread && (
                              <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {notification.content}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                    {index < notifications.length - 1 && (
                      <Separator className="my-1" />
                    )}
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNotifications
