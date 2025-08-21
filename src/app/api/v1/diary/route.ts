import { prisma } from "@/lib/auth";
import { cookies } from "next/headers";
import { authSessionServer } from "@/lib/auth";


export async function GET(request: Request) {
  const userData = await authSessionServer();
  // use the same route for both self and if other user is viewing someone's profile
  const url = new URL(request.url);
  const username = String(url.pathname.split("/profile/").at(-1));
  const isSelfProfile = userData?.user.username === username;


  try {
    let diaries;
    if (isSelfProfile) {
      diaries = await prisma.diary.findMany({
        where: {
          userId: userData?.user.id || "",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      diaries = await prisma.diary.findMany({
        where: {
          user: {
            username: username
          },
          types: {
            in: ["PERSONAL", "TRIVIAL", "GENERAL"] // Fetch only personal and public diaries
          }
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
      return new Response(JSON.stringify({ diaries, count: diaries.length }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching diaries:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch diaries" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

  }

export async function POST(request: Request) {
    const body = await request.json();
    const userData = await authSessionServer();

    try {
      const diary = await prisma.diary.create({
        data: {
          title: body.title,
          slug: body.slug,
          user: {
            connect: { id: userData?.user.id } // Ensure user is linked
          },
          types: body.types || "PERSONAL", // Default to PERSONAL if not provided
        }
      });
      // return new Response(JSON.stringify(diary), {
      //   headers: { "Content-Type": "application/json" },
      // });
    } catch (error) {
      // console.error("Error creating diary:", error);
      return new Response(JSON.stringify({ error: "Failed to create diary" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Diary created successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }

  export async function PATCH(request: Request) {
    const diaryId = request.headers.get("diaryId") || "";
    const body = await request.json();

    try {
      const diary = await prisma.diary.update({
        where: { id: diaryId },
        data: {
          title: body.title,
          types: body.types
        }
      });
      console.log("Diary updated:", diary);
    } catch (error) {
      console.error("Error updating diary:", error);
      return new Response(JSON.stringify({ error: "Failed to update diary" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Diary updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  export async function DELETE(request: Request) {
    const diaryId = request.headers.get("diaryId") || "";

    console.log("Deleting diary:", diaryId);

    try {
      await prisma.diary.delete({
        where: { id: diaryId }
      });
      console.log("Diary deleted:", diaryId);
    } catch (error) {
      console.error("Error deleting diary:", error);
      return new Response(JSON.stringify({ error: "Failed to delete diary" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Diary deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }