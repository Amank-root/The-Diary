import ProfileHeader from "@/components/singleton/ProfileHeader";
import ProfileDetails from "@/components/singleton/ProfileDetails"
import { getProfile } from '@/lib/actions/profile';
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const username = (await params).id;

  return {
    title: `${username}`,
    description: `View ${username}'s profile on Diary.`,
    keywords: ["profile", username, "diary"],
  };
}


async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const username = await params;
  const profileData = await getProfile(username.id);

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