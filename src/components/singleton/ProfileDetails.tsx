import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { ProfileDetails } from '@/lib/types';
import { followUser, unfollowUser } from '@/lib/actions/profile';
import { Mail } from 'lucide-react';
import UserModal from './UserModal';
import Link from 'next/link';

function ProfileDetails({ profileData }: { profileData: ProfileDetails }) {
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-8">
      {/* Profile Picture */}
      <div className="flex justify-center md:justify-start">
        <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-2 ring-border">
          <AvatarImage src={profileData.profileImage} alt="Profile" />
          <AvatarFallback className="text-2xl">
            {profileData.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Profile Info */}
      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold">{profileData.username}</h2>
          <div className="flex gap-2">
            {!profileData.isSelf &&
              (profileData.currentUser?.reading &&
              profileData.currentUser.reading.some(
                (reading) => reading.readingId === profileData.id
              ) ? (
                <form action={unfollowUser.bind(null, profileData.username)}>
                  <Button
                    variant="secondary"
                    size="sm"
                    type="submit"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    Reading
                  </Button>
                </form>
              ) : (
                <form action={followUser.bind(null, profileData.username)}>
                  <Button
                    variant="secondary"
                    size="sm"
                    type="submit"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    Read
                  </Button>
                </form>
              ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center md:justify-start gap-8 mb-4">
          <div className="text-center cursor-pointer">
            <div className="font-semibold">{profileData.pageCount}</div>
            <div className="text-sm text-muted-foreground">Pages</div>
          </div>
          <div className="text-center cursor-pointer">
            <div className="font-semibold">{profileData.diaryCount}</div>
            <div className="text-sm text-muted-foreground">Diaries</div>
          </div>
          <UserModal data={profileData.readers} type="reader" />
          <UserModal data={profileData.reading} type="reading" />
          {/* <div className="text-center">
                        <div className="font-semibold">{profileData.readerCount}</div>
                        <div className="text-sm text-muted-foreground">Readers</div>
                    </div>
                    <div className="text-center">
                        <div className="font-semibold">{profileData.readingCount}</div>
                        <div className="text-sm text-muted-foreground">Reading</div>
                    </div> */}
        </div>

        {/* Bio */}
        <div className="space-y-1">
          {/* <div className="font-semibold">John Doe</div> */}
          {profileData.bio &&
            profileData.bio.split(/\r?\n/).map((line, index) => {
              if (line.includes('mailto:')) {
                // console.log(line)
                return (
                  <div className="text-sm" key={index}>
                    <Link
                      target="_blank"
                      href={line}
                      className="hover:underline flex flex-row items-center-safe"
                    >
                      <Mail className="mr-1 text-sm" />{' '}
                      {line.split('mailto:')[1]}
                    </Link>
                  </div>
                );
              }
              return (
                <div className="text-sm" key={index}>
                  {line}
                </div>
              );
            })}
          {/* <div className="text-sm">📸 Photography enthusiast</div>
                    <div className="text-sm">🌍 Traveling the world</div>
                    <div className="text-sm">✨ Living life to the fullest</div> */}
          {profileData.website && (
            <div className="text-sm text-accent-foreground font-semibold">
              <Link
                target="_blank"
                href={profileData.website}
                className="hover:underline"
              >
                {profileData.website}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
