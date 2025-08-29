"use server";
import { authSessionServer, prisma } from "../auth";

export const getSimilarUsers = async (username: string) => {
    // Fetch similar users based on the provided username
    const session = await authSessionServer();
    if (!session?.session) {
        throw new Error("Unauthorized");
    }
    try {
        const getUsers = prisma.user.findMany({
            where: {
                username: {
                    contains: username.toLowerCase(),
                    not: {
                        equals: session.user.username
                    }
                }
            },
            select: {
                id: true,
                username: true,
                image: true,
                name: true,
                reading: true,
                readers: true
            }
        })

        const getSelf = prisma.user.findUnique({
            where: {
                id: session.user.id
            },
            select:{
                id: true,
                username: true,
                reading: true,
            }
        })

        const [users, currentUser] = await Promise.all([getUsers, getSelf]);
        return users && users?.length > 0 ? { users, currentUser } : null;
    } catch (error) {
        console.error("Error fetching similar users:", error);
        throw new Error("Failed to fetch similar users");
    }
}

