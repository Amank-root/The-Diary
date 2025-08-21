"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark, 
  MoreHorizontal,
  MapPin,
  Camera,
  Plus,
  PenTool
} from 'lucide-react'
import { toast } from 'sonner'

function FeedComponent() {
    const [likedPosts, setLikedPosts] = useState<number[]>([])
      const [savedPosts, setSavedPosts] = useState<number[]>([])
    
      const diaryPosts = [
        {
          id: 1,
          title: "A Beautiful Day",
          content: "Today was absolutely wonderful. The weather was perfect and I spent time with family in the park. We had a picnic and watched the sunset together. Moments like these remind me how grateful I am for the simple pleasures in life. 🌅✨",
          image: "https://dummyimage.com/210x297",
        //   image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
          date: "August 18, 2025",
          time: "2 hours ago",
          mood: "Happy",
          location: "Central Park",
          tags: ["sunny", "family", "gratitude"],
          likes: 12,
          comments: 3,
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 2,
          title: "Reflection on Growth",
          content: "I've been thinking a lot about personal growth lately. It's interesting how challenges shape us into who we're meant to become. Today I faced a difficult situation at work, but instead of feeling overwhelmed, I felt empowered. 💪📚",
          image: "https://dummyimage.com/210x297",
        //   image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=400&fit=crop",
          date: "August 17, 2025",
          time: "1 day ago",
          mood: "Thoughtful",
          location: "Home Office",
          tags: ["reflection", "growth", "mindfulness"],
          likes: 8,
          comments: 5,
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 3,
          title: "Weekend Adventures",
          content: "This weekend was packed with activities! From hiking in the morning to trying out that new coffee shop everyone's been talking about. Sometimes the best therapy is just getting out and exploring the world around you. ☕🥾",
          image: "https://dummyimage.com/210x297",
        //   image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=400&fit=crop",
          date: "August 16, 2025",
          time: "2 days ago",
          mood: "Excited",
          location: "Mountain Trail",
          tags: ["adventure", "hiking", "weekend"],
          likes: 15,
          comments: 7,
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
        }
      ]
    
      const handleLike = (postId: number) => {
        setLikedPosts(prev => 
          prev.includes(postId) 
            ? prev.filter(id => id !== postId)
            : [...prev, postId]
        )
        toast.success(likedPosts.includes(postId) ? "Removed from favorites" : "Added to favorites")
      }
    
      const handleSave = (postId: number) => {
        setSavedPosts(prev => 
          prev.includes(postId) 
            ? prev.filter(id => id !== postId)
            : [...prev, postId]
        )
        toast.success(savedPosts.includes(postId) ? "Removed from saved" : "Saved to collection")
      }
    
      const moodEmojis = {
        "Happy": "😊",
        "Thoughtful": "🤔",
        "Excited": "🤩"
      }
    return (
        <>
            {diaryPosts.map((post) => (
                <Card key={post.id} className="gap-3 rounded-none border-0 border-b">
                    {/* Post Header */}
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={post.avatar} />
                                <AvatarFallback>Me</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-sm">You</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <MapPin className="w-3 h-3" />
                                    <span>{post.location}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* <Badge variant="outline" className="text-xs">
                                {moodEmojis[post.mood as keyof typeof moodEmojis]} {post.mood}
                            </Badge> */}
                            <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Post Image */}
                    <div className="relative aspect-square">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Post Actions */}
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleLike(post.id)}
                                    className="p-0 h-auto"
                                >
                                    <Heart
                                        className={`w-6 h-6 ${likedPosts.includes(post.id)
                                                ? 'fill-red-500 text-red-500'
                                                : 'text-foreground'
                                            }`}
                                    />
                                </Button>
                                <Button variant="ghost" size="sm" className="p-0 h-auto">
                                    <MessageCircle className="w-6 h-6" />
                                </Button>
                                <Button variant="ghost" size="sm" className="p-0 h-auto">
                                    <Share className="w-6 h-6" />
                                </Button>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSave(post.id)}
                                className="p-0 h-auto"
                            >
                                <Bookmark
                                    className={`w-6 h-6 ${savedPosts.includes(post.id)
                                            ? 'fill-foreground'
                                            : ''
                                        }`}
                                />
                            </Button>
                        </div>

                        {/* Likes Count */}
                        {/* <p className="font-semibold text-sm mb-2">
                            {post.likes + (likedPosts.includes(post.id) ? 1 : 0)} likes
                        </p> */}

                        {/* Post Content */}
                        <div className="space-y-1">
                            {/* <p className="text-sm">
                                <span className="font-semibold">You</span> {post.content}
                            </p> */}

                            {/* Tags */}
                            {/* <div className="flex flex-wrap gap-1">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="text-sm text-blue-600 dark:text-blue-400">
                                        #{tag}
                                    </span>
                                ))}
                            </div> */}

                            {/* Comments */}
                            {/* {post.comments > 0 && (
                                <p className="text-sm text-muted-foreground mt-2">
                                    View all {post.comments} comments
                                </p>
                            )} */}

                            {/* Time */}
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                {post.time}
                            </p>
                        </div>
                    </div>
                </Card>
            ))}
        </>
    )
}

export default FeedComponent