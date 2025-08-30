"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell, Calendar, User } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Button } from '../ui/button'

function NotificationPanel() {
  const notifications = [
    // {
    //   id: 1,
    //   type: 'message',
    //   title: 'New Message',
    //   content: 'You have a new message from John',
    //   time: '2 min ago',
    //   icon: MessageSquare,
    //   unread: true
    // },
    {
      id: 2,
      type: 'calendar',
      title: 'Will be implemented soon',
      content: 'Notification not yet implemented',
      time: '~ Peace ❤',
      icon: Calendar,
      unread: true
    },
    {
      id: 3,
      type: 'UserStar',
      title: 'Aman kushwaha',
      content: 'Creator ~ Aman Kushwaha',
      time: 'mailto: contact@amank-root.slmail.me',
      icon: User,
      unread: false
    }
  ]

  return (
    <div className="hidden lg:flex lg:w-80 xl:w-96 lg:flex-col lg:border-l lg:border-border lg:bg-background">
      <Card className="h-full border-0 rounded-none shadow-none">
        <CardHeader className="pb-3 px-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4" />
            Notifications
            <Badge variant="secondary" className="ml-auto text-xs">
              {notifications.filter(n => n.unread).length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-1 p-4">
              {notifications.map((notification, index) => {
                const Icon = notification.icon
                return (
                  <div key={notification.id}>
                    <div className={`p-3 rounded-lg transition-colors hover:bg-accent cursor-pointer ${notification.unread ? 'bg-accent/50' : ''}`}>
                      <div className="flex items-start gap-3">
                        <Link href={"/profile/amank-root"}>
                          <div className={`p-2 rounded-full flex-shrink-0 ${notification.unread
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                            }`}>
                            <Icon className="h-3 w-3" />
                          </div>
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link href={"/profile/amank-root"}>
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
                          </Link>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time.includes("mailto:") ? (
                              <a href={notification.time}>
                                <Button variant="outline" className="cursor-pointer">
                                  Contact me
                                </Button>
                              </a>
                            ) : (
                              notification.time
                            )}
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
              <div className='text-sm flex gap-2 font-light underline'>
                {/* github */}
                <Link target='_blank' href={"https://github.com/amank-root"}>
                  {/* <Button variant="outline" className="cursor-pointer"> */}
                    GitHub
                  {/* </Button> */}
                </Link>
                {/* LinkedIn */}
                <Link target='_blank' href={"https://www.linkedin.com/in/amank-root"}>
                  {/* <Button variant="outline" className="cursor-pointer"> */}
                    LinkedIn
                  {/* </Button> */}
                </Link>
                {/* Twitter */}
                <Link target='_blank' href={"https://twitter.com/Amankushwaha_28"}>
                  {/* <Button variant="outline" className="cursor-pointer"> */}
                    Twitter
                  {/* </Button> */}
                </Link>
                {/* Portfolio */}
                <Link target='_blank' href={"https://amankushwaha.netlify.app/"}>
                  {/* <Button variant="outline" className="cursor-pointer"> */}
                    Portfolio
                  {/* </Button> */}
                </Link>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotificationPanel
