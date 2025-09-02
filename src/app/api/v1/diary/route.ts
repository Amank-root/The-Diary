import { prisma } from "@/lib/auth";
import { authSessionServer } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CreateDiarySchema = z.object({
  title: z.string().min(2).max(100).default("Untitled"),
  coverImageUrl: z.string().url().optional(),
  type: z.enum(["PERSONAL", "GENERAL", "SPECIAL", "TRIVIAL"]).default("PERSONAL"),
});


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

export async function POST(request: Request) {
  const userData = await authSessionServer();
  
  if (!userData?.session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const defaultImages = {
    SPECIAL: "https://res.cloudinary.com/dp3vyfcyc/image/upload/v1755971357/Modern_Botanical_Journal_Cover_Diary_wedo3z.png",
    PERSONAL: "https://res.cloudinary.com/dp3vyfcyc/image/upload/v1755971150/Modern_Botanical_Journal_Cover_Diary_2_cwdlnq.png",
    GENERAL: "https://res.cloudinary.com/dp3vyfcyc/image/upload/v1755971277/Modern_Botanical_Journal_Cover_Diary_1_dghre2.png",
    TRIVIAL: "https://res.cloudinary.com/dp3vyfcyc/image/upload/v1755970932/Modern_Botanical_Journal_Cover_Diary_3_g3gq9w.png"
  };

  try {
    const body = await request.json();
    
    const extracted = {
      title: body.title || "Untitled",
      coverImageUrl: body.coverImageUrl || defaultImages[body.type?.toUpperCase() as keyof typeof defaultImages] || defaultImages.PERSONAL,
      type: (body.type?.toUpperCase() || "PERSONAL") as "PERSONAL" | "GENERAL" | "SPECIAL" | "TRIVIAL",
    };

    const validated = CreateDiarySchema.safeParse(extracted);

    if (!validated.success) {
      console.error("Invalid diary data:", validated.error);
      return new Response(JSON.stringify({ error: "Invalid diary data", details: validated.error.errors }), { 
        status: 400 
      });
    }

    const newDiary = await prisma.diary.create({
      data: {
        title: validated.data.title,
        user: {
          connect: { id: userData.user.id }
        },
        types: validated.data.type,
        diaryCoverImage: validated.data.coverImageUrl ?? defaultImages[validated.data.type]
      },
      select: {
        id: true,
        title: true,
        diaryCoverImage: true,
        createdAt: true,
        types: true,
      }
    });

    revalidatePath('/diary');
    
    return new Response(JSON.stringify(newDiary), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error creating diary:", error);
    return new Response(JSON.stringify({ error: "Failed to create diary" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}