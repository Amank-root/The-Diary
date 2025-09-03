import ProfileHeader from "@/components/singleton/ProfileHeader";
import ProfileDetails from "@/components/singleton/ProfileDetails"
import { getProfile } from '@/lib/actions/profile';
import { notFound } from "next/navigation";


async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const username = await params;
  const profileData = await getProfile(username.id);
  // console.log(profileData)

  if (!profileData) {
    return notFound();
  }

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