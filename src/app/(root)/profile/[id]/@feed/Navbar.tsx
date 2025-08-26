'use client'
import React, {useState} from 'react'
import Link from 'next/link';
import { BookOpen, Bookmark, Grid3X3 } from 'lucide-react';
import { usePathname } from 'next/navigation';


function Navbar({id}: {id: string}) {
    const pathname = usePathname();
    const activeTab = pathname.split('/').pop();

    return (
        <div className="flex">
            <Link href={`/profile/${id}`}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${activeTab === id ? "border-t-2 border-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
            >
                <Grid3X3 className="w-4 h-4" />
                POSTS
            </Link>
            <Link href={`/profile/${id}/diary`}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${activeTab === "diary" ? "border-t-2 border-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
            >
                <BookOpen className="w-4 h-4" />
                DIARY
            </Link>
            <Link href={`/profile/${id}/saved`}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${activeTab === "saved" ? "border-t-2 border-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
            >
                <Bookmark className="w-4 h-4" />
                SAVED
            </Link>
        </div>
    )
}

export default Navbar