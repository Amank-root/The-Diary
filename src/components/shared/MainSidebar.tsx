"use client"

import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { 
  ChartArea, 
  Home, 
  Inbox, 
  Search, 
  Settings,
  BookOpen,
  PlusCircle,
  CircleUser,
  Users
} from 'lucide-react'
import { ModeToggle } from './toogle-theme'
import Link from 'next/link'
import { Separator } from '../ui/separator'
import { usePathname } from 'next/navigation'

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Notes",
    url: "/notes",
    icon: PlusCircle,
  },
  {
    title: "My Diary",
    url: "/diary",
    icon: BookOpen,
  },
  {
    title: "Explore",   
    url: "/explore",
    icon: Search,
  },
  {
    title: "Connections",
    url: "/connections",
    icon: Users,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: ChartArea,
  },
//   {
//     title: "Favorites",
//     url: "#",
//     icon: Star,
//   },
  {
    title: "Profile",
    url: "/profile",
    icon: CircleUser,
  },
]

const secondaryItems = [
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

function MainSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className='sticky border-r-2' variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <BookOpen className="h-6 w-6" />
          <span className="font-semibold text-lg">My Diary</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === pathname}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator/>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4">
          <ModeToggle />
        </div>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}

export default MainSidebar