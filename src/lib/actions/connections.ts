"use server"
import { prisma, authSessionServer } from '@/lib/auth';

export const getConnections = async () => {
  const session = await authSessionServer();
  if (!session) return null;

  const userId = session.user.id;

  try {
    const getUserWithDiaries = await prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        readers: {
          select: {
            id: true,
            createdAt: true,
            reader: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        },
        reading: {
          select: {
            id: true,
            createdAt: true,
            reading: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        },
        _count: {
          select: {
            diaries: true,
          }
        },
        diaries: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            types: true,
            _count: {
              select: {
                pages: true
              }
            },
            pages: {
              select: {
                id: true,
                createdAt: true
              }
            }
          }
        }
      }
    })
    // // console.log(getUserWithDiaries?.readers, getUserWithDiaries?.reading)
    return getUserWithDiaries;
  } catch (error) {
    console.error("Error fetching user with diaries:", error);
    throw new Error("Failed to fetch user with diaries");
    // return null;
  }


  // const connections = "";

}