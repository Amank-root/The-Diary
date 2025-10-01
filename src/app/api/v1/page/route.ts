import { prisma, authSessionServer } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const userData = await authSessionServer();
  if (!userData?.session){
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const url = new URL(request.url);
  const pathname = url.pathname;

  let pages = [];

  try {
    // Check if route is /profile/[username]
    if (pathname.includes("/profile/")) {
      const username = pathname.split("/profile/").at(-1);
      // const isSelf = username === userData?.user.username;

      // Find user by username
      const user = await prisma.user.findUnique({
        where: { username: username || "" },
        select: { id: true },
      });

      if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
      }

      // Fetch only public pages (even if it's self)
      pages = await prisma.page.findMany({
        where: {
          isPublic: true,
          diary: { userId: user.id },
        },
        orderBy: { createdAt: "desc" },
        include: {
          diary: { select: { title: true, id: true } }
        }
      });

    } else if (pathname.includes("/diary/")) {
      // Extract diaryId from URL
      const diaryId = pathname.split("/diary/").at(-1);

      const diary = await prisma.diary.findUnique({
        where: { id: diaryId || "" },
        select: { userId: true },
      });

      if (!diary) {
        return new Response(JSON.stringify({ error: "Diary not found" }), { status: 404 });
      }

      // Only the owner can access all pages
      if (userData?.user.id !== diary.userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
      }

      pages = await prisma.page.findMany({
        where: { diaryId },
        orderBy: { createdAt: "desc" },
      });

    } else {
      // Fallback: show only public pages (for discovery/home view maybe)
      pages = await prisma.page.findMany({
        where: { isPublic: true },
        orderBy: { createdAt: "desc" },
        include: {
          diary: { select: { title: true, id: true } }
        }
      });
    }

    return new Response(JSON.stringify({ pages, count: pages.length }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error fetching pages:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch pages" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


export async function POST(request: Request) {
    const userData = await authSessionServer();
    if (!userData?.session){
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const body = await request.json();
    // // console.log(body, "body in create page", body.pageNumber);
    try {
      const data = await prisma.page.create({
        data:{
          content: body.content || "New page content",
          diary: { connect: { id: body.diaryId || "" } },
          isPublic: body.isPublic || false,
          pageNumber: body.pageNumber || 1,
          pageImageUrl: body.pageImageUrl || null,
        }
      });
      // // console.log("hi", data);
      revalidatePath(`/diary/${body.diaryId}`);
      return new Response(JSON.stringify(data), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
    } catch (error) {
      console.error("Error creating page:", error);
      return new Response(JSON.stringify({ error: "Failed to create page" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    
}