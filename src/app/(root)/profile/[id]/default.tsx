import ProfileHeader from "@/components/singleton/ProfileHeader";
import ProfileDetails from "@/components/singleton/ProfileDetails"
import { getProfile } from '@/lib/actions/profile';


async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const username = await params;
  const profileData = await getProfile(username.id);

  return (
    <>
      {/* Header */}
      <ProfileHeader profileData={profileData} />

      {/* Profile Section */}
      <ProfileDetails profileData={profileData} />

    </>
  )
}

export default Profile;