import ProfileHeader from "@/components/singleton/ProfileHeader";
import ProfileDetails from "@/components/singleton/ProfileDetails"
import { getProfile } from '@/lib/actions/profile';
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const username = (await params).id;
  console.log("Generating metadata for:", username);

  return {
    title: `${username}`,
    description: `View ${username}'s profile on Diary.`,
    keywords: ["profile", username, "diary"],
  };
}


async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const username = await params;
  const profileData = await getProfile(username.id);
  // console.log("Profile Data:", "sdsghdjs", username.id);

  if (!profileData) {
    console.log("Profile not found, returning 404");
    return notFound();
  }


  return (
 

  // <div className='w-full'>

  //   <div className="max-w-4xl mx-auto px-4">
      <>
      {/* Header */}
      <ProfileHeader profileData={profileData} />

      {/* Profile Section */}
      <ProfileDetails profileData={profileData} />

      {/* <ProfilePageTabs posts={posts} diaryEntries={diaryEntries} /> */}
      </>

  //   </div>
  // </div>
  
  )
}

export default Profile;