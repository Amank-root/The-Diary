import React from 'react'
import DiaryHeader from '@/components/singleton/DiaryHeader'
import { Separator } from '@/components/ui/separator'

function layout({ children, feed }: { children: React.ReactNode, feed: React.ReactNode }) {
    return (
        <div className='flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6'>
            <DiaryHeader
                title="Profile"
                description="View and edit your profile information"
                btnHidden
            />
            <Separator />
            <div>
                {/* {feed}
                {children} */}
                {/* <div className='w-full'> */}

                    {/* <div className="max-w-4xl mx-auto px-4"> */}
                        {children}
                        {feed}
                    {/* </div> */}
                {/* </div> */}
            </div>
        </div>
    )
}

export default layout