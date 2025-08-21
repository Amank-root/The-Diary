"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MoreHorizontal, Grid3X3, Bookmark, UserCheck, Settings, BookOpen, Camera } from "lucide-react"
import { useEffect, useState } from "react"

export function InstagramProfile() {
    const [activeTab, setActiveTab] = useState("posts")
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [profileData, setProfileData] = useState({
        name: "John Doe",
        username: "johndoe",
        bio: "📸 Photography enthusiast\n🌍 Traveling the world\n✨ Living life to the fullest",
        website: "www.johndoe.com",
        profileImage: "https://dummyimage.com/400&text=Profile+Image",
    })

    const [formData, setFormData] = useState(profileData)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const handleSaveProfile = () => {
        const updatedData = { ...formData }
        if (imagePreview) {
            updatedData.profileImage = imagePreview
        }
        setProfileData(updatedData)
        setIsSettingsOpen(false)
        setImagePreview(null)
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setImagePreview(result)
            }
            reader.readAsDataURL(file)
        }
    }


    const posts = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        image: `https://dummyimage.com/210x297`,
        likes: Math.floor(Math.random() * 1000) + 100,
        comments: Math.floor(Math.random() * 50) + 5,
    }))

    const diaryEntries = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Day ${i + 1} - My Journey`,
        date: new Date(2024, 0, i + 1).toLocaleDateString(),
        preview: `Today was an amazing day filled with new experiences and memories...`,
        image: `https://dummyimage.com/210x297`,
    }))

    const highlights = [
        { id: 1, name: "Travel", image: "/travel-highlight.png" },
        { id: 2, name: "Food", image: "/delicious-food-selection.png" },
        { id: 3, name: "Work", image: "/work-highlight.png" },
        { id: 4, name: "Friends", image: "/friends-highlight.png" },
        { id: 5, name: "Art", image: "/art-highlight.png" },
    ]

    useEffect(() => {
        // Fetch and set initial profile data here
        const fetchProfileData = async () => {
            // Simulate an API call
            const response = await new Promise<{ data: typeof profileData }>((resolve) =>
                setTimeout(() => resolve({ data: profileData }), 1000)
            )
            
            setProfileData(response.data)
        }

        fetchProfileData()
    
    }, [])

    return (
        <div className="max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">{profileData.username}</h1>
                <div className="flex items-center gap-2">
                    <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                        <DialogTrigger asChild>
                            <Settings className="w-6 h-6 cursor-pointer hover:text-accent transition-colors" />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Profile Picture</Label>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="w-16 h-16">
                                            <AvatarImage src={imagePreview || profileData.profileImage} alt="Profile preview" />
                                            <AvatarFallback>
                                                {profileData.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <Label htmlFor="profile-image" className="cursor-pointer">
                                                <div className="flex items-center gap-2 px-3 py-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                                                    <Camera className="w-4 h-4" />
                                                    <span className="text-sm">Change Photo</span>
                                                </div>
                                            </Label>
                                            <Input
                                                id="profile-image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        value={formData.username}
                                        onChange={(e) => handleInputChange("username", e.target.value)}
                                        placeholder="Your username"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={formData.bio}
                                        onChange={(e) => handleInputChange("bio", e.target.value)}
                                        placeholder="Tell us about yourself"
                                        rows={4}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Website</Label>
                                    <Input
                                        id="website"
                                        value={formData.website}
                                        onChange={(e) => handleInputChange("website", e.target.value)}
                                        placeholder="Your website URL"
                                    />
                                </div>
                                <div className="flex gap-2 pt-4">
                                    <Button onClick={handleSaveProfile} className="flex-1">
                                        Save Changes
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setFormData(profileData)
                                            setImagePreview(null)
                                            setIsSettingsOpen(false)
                                        }}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    {/* <MoreHorizontal className="w-6 h-6" /> */}
                </div>
            </div>
            {/* <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">johndoe</h1>
                <div className="flex items-center gap-2">
                    <Settings className="w-6 h-6" />
                    <MoreHorizontal className="w-6 h-6" />
                </div>
            </div> */}

            {/* Profile Section */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                {/* Profile Picture */}
                <div className="flex justify-center md:justify-start">
                    <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-2 ring-border">
                        <AvatarImage src={profileData.profileImage} alt="Profile" />
                        <AvatarFallback className="text-2xl">JD</AvatarFallback>
                    </Avatar>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                        <h2 className="text-xl font-semibold">johndoe</h2>
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                            >
                                Follow
                            </Button>
                            {/* <Button variant="outline" size="sm">
                Message
              </Button> */}
                            {/* <Button variant="outline" size="sm">
                <UserCheck className="w-4 h-4" />
              </Button> */}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center md:justify-start gap-8 mb-4">
                        <div className="text-center">
                            <div className="font-semibold">1,234</div>
                            <div className="text-sm text-muted-foreground">posts</div>
                        </div>
                        <div className="text-center">
                            <div className="font-semibold">47</div>
                            <div className="text-sm text-muted-foreground">diary</div>
                        </div>
                        <div className="text-center">
                            <div className="font-semibold">567K</div>
                            <div className="text-sm text-muted-foreground">followers</div>
                        </div>
                        <div className="text-center">
                            <div className="font-semibold">890</div>
                            <div className="text-sm text-muted-foreground">following</div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-1">
                        <div className="font-semibold">John Doe</div>
                        <div className="text-sm">📸 Photography enthusiast</div>
                        <div className="text-sm">🌍 Traveling the world</div>
                        <div className="text-sm">✨ Living life to the fullest</div>
                        <div className="text-sm text-accent-foreground font-semibold">
                            <a href="#" className="hover:underline">
                                www.johndoe.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Highlights */}
            {/* <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
        {highlights.map((highlight) => (
          <div key={highlight.id} className="flex flex-col items-center gap-2 min-w-fit">
            <div className="w-16 h-16 rounded-full ring-2 ring-border overflow-hidden hover:ring-accent transition-colors cursor-pointer">
              <img
                src={highlight.image || "/placeholder.svg"}
                alt={highlight.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-center">{highlight.name}</span>
          </div>
        ))}
      </div> */}

            {/* Tab Navigation */}
            <div className="flex justify-center border-t border-border mb-8">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab("posts")}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${activeTab === "posts" ? "border-t-2 border-foreground" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <Grid3X3 className="w-4 h-4" />
                        POSTS
                    </button>
                    <button
                        onClick={() => setActiveTab("diary")}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${activeTab === "diary" ? "border-t-2 border-foreground" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <BookOpen className="w-4 h-4" />
                        DIARY
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${activeTab === "saved" ? "border-t-2 border-foreground" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <Bookmark className="w-4 h-4" />
                        SAVED
                    </button>
                </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === "posts" && (
                /* Posts Grid */
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                    {posts.map((post) => (
                        <Card key={post.id} className="p-0 aspect-auto overflow-hidden group cursor-pointer border-0 shadow-sm">
                            <div className="relative w-full h-full">
                                <img
                                    src={post.image || "https://dummyimage.com/210x297"}
                                    alt={`Post ${post.id}`}
                                    className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="flex items-center gap-4 text-white">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-semibold">{post.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-semibold">{post.comments}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {activeTab === "diary" && (
                <div className="grid grid-cols-3 gap-4">
                    {diaryEntries.map((entry) => (
                        <Card key={entry.id} className="p-0 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                            <div className="aspect-auto overflow-hidden">
                                <img
                                    src={entry.image || "https://dummyimage.com/210x297&text=Diary+Entry"}
                                    alt={entry.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                                />
                            </div>
                            {/* <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">{entry.title}</h3>
                  <span className="text-xs text-muted-foreground">{entry.date}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{entry.preview}</p>
              </div> */}
                        </Card>
                    ))}
                </div>
            )}

            {activeTab === "saved" && (
                <div className="text-center py-12">
                    <Bookmark className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No saved posts yet</p>
                </div>
            )}
        </div>
    )
}
