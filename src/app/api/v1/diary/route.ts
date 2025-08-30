import { prisma } from "@/lib/auth";
import { authSessionServer } from "@/lib/auth";


export async function GET(request: Request) {
  const userData = await authSessionServer();
  const username = userData?.user.username;
  // check search param
  const url = new URL(request.url);
  const searchParam = url.searchParams.get("id");

    if (!userData) {
    throw new Error("User not authenticated");
  }
  if (searchParam) {
    // fetch diary by id
    // // console.log("Fetching diary with id:", searchParam);
    try {
      const diary = await prisma.diary.findUnique({
        where: { id: searchParam },
        select: {
          id: true,
          title: true,
          diaryCoverImage: true,
          createdAt: true,
          types: true,
          pages: true
        }
      });
      if (!diary) {
        return new Response("Diary not found", { status: 404 });
      }
      return new Response(JSON.stringify(diary), { status: 200 });
    } catch (error) {
      console.error("Error fetching diary by id:", error);
      return new Response("Error fetching diary", { status: 500 });
    }
  }

  // // console.log(username, "username in getDiaries", userData.user.username);
  try {
    const diaries = await prisma.diary.findMany({
      where: {
        user: {
          username: username
        },
        types: {
          in: ["PERSONAL", "GENERAL", "SPECIAL", "TRIVIAL"]
        }
      },
      select: {
        id: true,
        title: true,
        diaryCoverImage: true,
        createdAt: true,
        types: true,
        pages: true
      }
    });
    // revalidatePath(`/profile/${username}/diary`);
    return new Response(JSON.stringify(diaries), { status: 200 });

  } catch (error) {
    console.error("Error fetching diaries:", error);
    return new Response("Error fetching diaries", { status: 500 });
  }
}