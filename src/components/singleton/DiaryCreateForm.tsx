"use client";

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { createDiary } from "@/lib/actions/diaryAction"
import { Plus, Camera } from "lucide-react"


function DiaryCreateForm() {
    const [isOpen, setIsOpen] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [btnDisabled, setBtnDisabled] = useState(false)



    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImagePreview(URL.createObjectURL(file));
        setBtnDisabled(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'diaryCover')
        formData.append('cloud_name', 'dp3vyfcyc');

        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dp3vyfcyc/image/upload', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();
            // console.log(data, 'cloudinary response');
            setImagePreview(data.secure_url);
            setBtnDisabled(false);
        } catch (err) {
            console.error('Image upload failed:', err);
        }
    };

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className="w-fit">
                        <Plus className="h-4 w-4" />
                        <span>New Diary</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create New Diary</DialogTitle>
                    </DialogHeader>
                    {/* @ts-expect-error: i dont know */}
                    <form action={createDiary}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Cover Picture</Label>
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-16 h-16">
                                        <AvatarImage src={imagePreview ?? ""} alt="Profile preview" />
                                        <AvatarFallback>
                                            The Diary
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <Label htmlFor="profile-image" className="cursor-pointer">
                                            <div className="flex items-center gap-2 px-3 py-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                                                <Camera className="w-4 h-4" />
                                                <span className="text-sm">Cover Photo</span>
                                            </div>
                                        </Label>
                                        <Input
                                            id="profile-image"
                                            type="file"
                                            // name="cover"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </div>
                                </div>
                                <Input type="hidden" name="coverImageUrl" value={imagePreview ?? ""} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Title</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="title"
                                    maxLength={50}
                                    defaultValue={"New Diary"}
                                    placeholder="Your Title"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="types">Type</Label>
                                <Select name='type' defaultValue='personal'>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Types</SelectLabel>
                                            <SelectItem value="personal">Personal</SelectItem>
                                            <SelectItem value="special">Special</SelectItem>
                                            <SelectItem value="general">General</SelectItem>
                                            <SelectItem value="trivial">Trivial</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button type="submit" onClick={() => setIsOpen((prev) => !prev)} className="flex-1" disabled={btnDisabled}>
                                    Save Changes
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setImagePreview(null)
                                        setIsOpen(false)
                                    }}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DiaryCreateForm