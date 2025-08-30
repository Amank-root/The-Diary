"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'
import DiaryHeader from '../singleton/DiaryHeader'
import SmallCards from '../singleton/smallCards'

const smallCardsData = [
    {
        title: "Total Entries",
        icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
        mainContent: "25%",
        subContent: "+3 from last week"
    },
    {
        title: "Writing Streak",
        icon: <Clock className="h-4 w-4 text-muted-foreground" />,
        mainContent: "7 days",
        subContent: "Keep it going!"
    },
    {
        title: "Happy",
        icon: <div className="h-4 w-4 bg-yellow-400 rounded-full" />,
        mainContent: "60%",
        subContent: "of entries"
    }
]

function AnalyticsComponent() {
    const recentEntries = [
        {
            id: 1,
            title: "A Beautiful Day",
            preview: "Today was absolutely wonderful. The weather was perfect and I spent time...",
            date: "August 18, 2025",
            mood: "Happy",
            tags: ["sunny", "family", "gratitude"]
        },
        {
            id: 2,
            title: "Reflection on Growth",
            preview: "I've been thinking a lot about personal growth lately. It's interesting how...",
            date: "August 17, 2025",
            mood: "Thoughtful",
            tags: ["reflection", "growth", "mindfulness"]
        },
        {
            id: 3,
            title: "Weekend Adventures",
            preview: "This weekend was packed with activities. From hiking in the morning to...",
            date: "August 16, 2025",
            mood: "Excited",
            tags: ["adventure", "hiking", "weekend"]
        }
    ]

    const moodColors = {
        "Happy": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        "Thoughtful": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        "Excited": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    }

    return (
        <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">
            {/* Header Section */}
            <DiaryHeader
                title="Analytics"
                description="Ready to analyze your data?"
            />

            {/* Search Bar */}
            {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
            placeholder="Search your diary entries..."
            className="pl-10"
            />
        </div> */}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    smallCardsData.map((card, index) => (
                        <SmallCards
                            key={index}
                            title={card.title}
                            icon={card.icon}
                            mainContent={card.mainContent}
                            subContent={card.subContent}
                        />
                    ))
                }
            </div>

            {/* Recent Entries */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg lg:text-xl">Recent Entries</CardTitle>
                    <CardDescription>
                        Your latest diary entries and thoughts
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentEntries.map((entry) => (
                        <div key={entry.id} className="border rounded-lg p-3 lg:p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 lg:gap-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-base lg:text-lg mb-2">{entry.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                                        {entry.preview}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        {entry.date}
                                    </div>
                                </div>
                                <div className="flex flex-row lg:flex-col lg:items-end gap-2">
                                    <Badge
                                        variant="secondary"
                                        className={moodColors[entry.mood as keyof typeof moodColors]}
                                    >
                                        {entry.mood}
                                    </Badge>
                                    <div className="flex flex-wrap gap-1 justify-start lg:justify-end">
                                        {entry.tags.slice(0, 2).map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                        {entry.tags.length > 2 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{entry.tags.length - 2}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

export default AnalyticsComponent
