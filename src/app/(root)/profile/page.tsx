'use client'
import React from 'react'
// import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import DiaryHeader from '@/components/singleton/DiaryHeader';
import { InstagramProfile } from '@/components/shared/ProfileComponent';
import { Separator } from '@/components/ui/separator';

function Profile() {
    return (
        <div className='flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6'>
            <DiaryHeader
                title="Profile"
                description="View and edit your profile information"
                btnHidden
            />
            <Separator/>
            {/* Avatar and User Information */}
            <div className='w-full'>
                {/* <div className='flex w-24 h-24 items-center md:h-56 md:w-56 rounded-full overflow-hidden bg-gray-200'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className='flex flex-col md:ml-4 text-center'>
                    <div className='w-full justify-center flex text-center'>
                    <span className='font-semibold text-2xl md:text-3xl '>Lorem ipsum </span>

                    </div>
                    <span className='text-sm text-muted-foreground'></span>
                </div> */}
                <InstagramProfile/>
            </div>
        </div>
    )
}

export default Profile;