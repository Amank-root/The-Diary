"use client";
import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

function ExploreSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    // const searchQuery = searchParams.get("search") || "";

    const handleSearch = useDebouncedCallback((query: string) => {
        const params = new URLSearchParams(searchParams);
        if (query) {
            params.set("search", query);
        } else {
            params.delete("search");
        }
        const newPath = `${pathname}?${params.toString()}`;
        replace(newPath);
    }, 300);

    return (
        <div className="sticky top-0 z-10 bg-background border-b border-border">
            <div className="max-w-4xl mx-auto px-4 py-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        type="text"
                        placeholder="Search"
                        defaultValue={searchParams.get('search')?.toString()}
                        onChange={(e) => {
                            handleSearch(e.target.value);
                        }}
                        className="pl-10 bg-input border-border rounded-lg"
                    />
                </div>
            </div>
        </div>
    )
}

export default ExploreSearch