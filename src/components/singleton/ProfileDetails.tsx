import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { ProfileDetails } from "@/lib/types"
import { followUser, unfollowUser } from "@/lib/actions/profile"


function ProfileDetails({ profileData }: { profileData: ProfileDetails }) {

    return (
        <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Profile Picture */}
            <div className="flex justify-center md:justify-start">
                <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-2 ring-border">
                    <AvatarImage src={profileData.profileImage} alt="Profile" />
                    <AvatarFallback className="text-2xl">{profileData.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                    <h2 className="text-xl font-semibold">{profileData.username}</h2>
                    <div className="flex gap-2">
                        {!profileData.isSelf && (
                            profileData.reading && profileData.readers.some(user => user.readingId === profileData.id) ? (
                                // @ts-ignore
                                <form action={unfollowUser.bind(null, profileData.username)}>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        type="submit"
                                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                    >
                                        Following
                                    </Button>
                                </form>
                            ) : (
                                // @ts-ignore
                                <form action={followUser.bind(null, profileData.username)}>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        type="submit"
                                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                    >
                                        Follow
                                    </Button>
                                </form>
                            )
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex justify-center md:justify-start gap-8 mb-4">
                    <div className="text-center">
                        <div className="font-semibold">{profileData.pageCount}</div>
                        <div className="text-sm text-muted-foreground">Pages</div>
                    </div>
                    <div className="text-center">
                        <div className="font-semibold">{profileData.diaryCount}</div>
                        <div className="text-sm text-muted-foreground">Diaries</div>
                    </div>
                    <div className="text-center">
                        <div className="font-semibold">{profileData.readerCount}</div>
                        <div className="text-sm text-muted-foreground">Readers</div>
                    </div>
                    <div className="text-center">
                        <div className="font-semibold">{profileData.readingCount}</div>
                        <div className="text-sm text-muted-foreground">Reading</div>
                    </div>
                </div>

                {/* Bio */}
                <div className="space-y-1">
                    {/* <div className="font-semibold">John Doe</div> */}
                    {profileData.bio &&
                        profileData.bio.split(/\r?\n/).map((line, index) => (
                            <div className="text-sm" key={index}>{line}</div>
                        ))}
                    {/* <div className="text-sm">📸 Photography enthusiast</div>
                    <div className="text-sm">🌍 Traveling the world</div>
                    <div className="text-sm">✨ Living life to the fullest</div> */}
                    {profileData.website && (
                        <div className="text-sm text-accent-foreground font-semibold">
                            <a href={profileData.website} className="hover:underline">
                                {profileData.website}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails