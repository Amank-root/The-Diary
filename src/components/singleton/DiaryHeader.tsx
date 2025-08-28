"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import DiaryCreateForm from './DiaryCreateForm'
import { useSession } from '@/lib/auth-client'

function DiaryHeader({ title, description, btnText, href, btnHidden = false, isDiary = false }: { title: string, description: string, btnText?: string, href?: string, btnHidden?: boolean, isDiary?: boolean }) {
    const {data, error, isPending} = useSession();
    if (error) return <div>Error loading user data</div>
    if (isPending) return <div>Loading...</div>

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
                <p className="text-muted-foreground text-sm lg:text-base">{description}</p>
            </div>
            {isDiary ? (
                // <div>Diary Content</div>
                <DiaryCreateForm />
            ) : btnHidden ? null : btnText && href ? (
                <Button className="w-fit" asChild>
                    <Link href={href}>
                        <Plus className="h-4 w-4" />
                        {btnText}
                    </Link>
                </Button>
            ) : (
                <Link href={`/profile/`}>
                    <Avatar>
                        <AvatarImage src={data?.user?.image || ''} alt={data?.user?.name || 'User Avatar'} />
                        <AvatarFallback>{data?.user?.name || 'User'}</AvatarFallback>
                    </Avatar>
                </Link>
            )
            }
        </div>
    )
}

export default DiaryHeader