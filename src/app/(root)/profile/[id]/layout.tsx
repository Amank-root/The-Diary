import React from 'react'
import DiaryHeader from '@/components/singleton/DiaryHeader'
import { Separator } from '@/components/ui/separator'

function layout({ children, feed, modal }: { children: React.ReactNode, feed: React.ReactNode, modal: React.ReactNode }) {
    return (
            <div className='flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6'>
                <DiaryHeader
                    title="Profile"
                    description="View and edit your profile information"
                    btnHidden
                    />
                <Separator />
                <div>
                    {modal}
                    {children}
                    {feed}

                </div>
            </div>
    )
}

export default layout