"use server";

import { prisma, authSessionServer } from "../auth";

export async function getAllUserNotes() {
    const userData = await authSessionServer();

    try {
        const notes = await prisma.note.findMany({
            where: { userId: userData?.user?.id },
            orderBy: { createdAt: "desc" },
        });

        return notes;
    } catch (error) {
        console.error("Error fetching user notes:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch user notes" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}


export async function getFriendsNotes() {
  const userData = await authSessionServer();
  let followedUsers;
  try {
    const following = await prisma.user.findUnique({
      where: { id: userData?.user?.id },
      include: {
        reading: {
          include: {
            reading: true, // include the User being followed
          },
        },
      },
    });

    followedUsers = following?.reading.map(r => ({
      id: r.reading.id,
      username: r.reading.username,
      name: r.reading.name,
      image: r.reading.image
    }));
    // console.log("Followed users:", followedUsers);
  } catch (error) {
    // console.error("Error fetching followed users:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch followed users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const getFriendsDiaries = await prisma.note.findMany({
      where: {
        user: {
          id: {
            in: followedUsers?.map(user => user.id) ?? [],
          },
        },
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // createdAt less than 24 hours ago
        },
      },
    });
    console.log("Friends' diaries:", getFriendsDiaries);
    // return new Response(JSON.stringify(getFriendsDiaries), {
    //   status: 200,
    //   headers: { "Content-Type": "application/json" },
    // });
    return getFriendsDiaries;
  } catch (error) {
    console.error("Error fetching friends' diaries:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch friends' diaries" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}