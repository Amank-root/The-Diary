'use client';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { updateProfileData } from '@/lib/actions/profile';
import { Settings, Camera } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileHeaderProps {
  profileData: {
    bio: string;
    website: string;
    name: string;
    username: string;
    profileImage: string;
    isSelf?: boolean;
  };
}

function ProfileHeader({ profileData }: ProfileHeaderProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setBtnDisabled(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'AvatarImageUrl');

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();
      // console.log(data, 'cloudinary response');
      setImagePreview(data.secure_url);
      toast.success('Image uploaded successfully');
      setBtnDisabled(false);
    } catch (err) {
      console.error('Image upload failed:', err);
      toast.error('Image upload failed');
    }
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold">{profileData.name}</h1>
      <div className="flex items-center gap-2">
        {profileData.isSelf && (
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Settings className="w-6 h-6 cursor-pointer hover:text-accent-foreground transition-colors" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <form action={updateProfileData}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={imagePreview || profileData.profileImage}
                          alt="Profile preview"
                        />
                        <AvatarFallback>
                          {profileData.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Label
                          htmlFor="profile-image"
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-2 px-3 py-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                            <Camera className="w-4 h-4" />
                            <span className="text-sm">Change Photo</span>
                          </div>
                        </Label>
                        <Input
                          id="profile-image"
                          type="file"
                          name="profileImage"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </div>
                    <Input
                      type="hidden"
                      name="profileImageUrl"
                      value={imagePreview || profileData.profileImage}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      maxLength={50}
                      defaultValue={profileData.name}
                      // value={formData.name}
                      // onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      maxLength={50}
                      name="username"
                      className="mb-0"
                      defaultValue={profileData.username}
                      placeholder="Your username"
                    />
                    <span className="text-xs p-0 leading-0 text-gray-500">
                      👉 Changing username requires re-authentication.
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      maxLength={160}
                      defaultValue={profileData.bio}
                      placeholder="Tell us about yourself"
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="text"
                      name="website"
                      defaultValue={profileData.website}
                      placeholder="Your website URL"
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      type="submit"
                      onClick={() => setIsSettingsOpen((prev) => !prev)}
                      className="flex-1"
                      disabled={btnDisabled}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setImagePreview(null);
                        setIsSettingsOpen(false);
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
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;
