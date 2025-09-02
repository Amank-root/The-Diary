import { authSessionServer, prisma } from "@/lib/auth";

export async function GET(request: Request) {
  const userData = await authSessionServer();
  
  if (!userData?.session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const url = new URL(request.url);
  const searchQuery = url.searchParams.get('q');
  
  if (!searchQuery || searchQuery.trim().length < 2) {
    return new Response(JSON.stringify({ error: "Search query must be at least 2 characters" }), { 
      status: 400 
    });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: searchQuery.toLowerCase(),
          not: {
            equals: userData.user.username
          }
        }
      },
      select: {
        id: true,
        username: true,
        image: true,
        name: true,
        bio: true,
        _count: {
          select: {
            readers: true,
            reading: true,
            diaries: true
          }
        }
      },
      take: 10 // Limit results
    });

    // Get current user's following list to mark if already following
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userData.user.id
      },
      select: {
        reading: {
          select: {
            readingId: true
          }
        }
      }
    });

    const followingIds = new Set(currentUser?.reading.map(r => r.readingId) || []);

    const usersWithFollowStatus = users.map(user => ({
      ...user,
      isFollowing: followingIds.has(user.id)
    }));

    return new Response(JSON.stringify({
      users: usersWithFollowStatus,
      total: usersWithFollowStatus.length
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error searching users:", error);
    return new Response(JSON.stringify({ error: "Failed to search users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}