"use client"

import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import MainSidebar from './MainSidebar'
import NotificationPanel from './NotificationPanel'

function Container({ children, className } : { children: React.ReactNode, className?: string }) {
    return (
        <SidebarProvider>
            <div className={`min-h-screen flex w-full max-w-[1550px] mx-auto ${className}`}>
                {/* Main Sidebar */}
                <MainSidebar />
                
                {/* Main Content Area */}
                <main className="flex-1 flex flex-col min-w-0">
                    {/* Mobile sidebar trigger */}
                    <div className="lg:hidden p-4 border-b">
                        <SidebarTrigger />
                    </div>
                    
                    {/* Content wrapper with notification panel */}
                    <div className="flex flex-1 min-h-0">
                        {/* Main content */}
                        <div className="flex-1 min-w-0 overflow-auto">
                            {children}
                        </div>
                        
                        {/* Notification Panel */}
                        <NotificationPanel />
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}

export default Container;