"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

function RouteBack() {
    const router = useRouter();
    return (
        <Button
            onClick={() => router.back()}
            className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition"
        >
            ✕
        </Button>
    )
}

export default RouteBack