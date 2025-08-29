"use server"
import { prisma } from '@/lib/auth';

export async function getConnections(username: string) {
  try {
    const currentUser = await prisma.user.findUnique({
      where: { username },
      include: {
        reading: {
          include: {
            reading: { // Get full user data for users being read
              select: {
                id: true,
                name: true,
                username: true,
                profileImage: true,
                _count: {
                  select: {
                    diaries: true,
                    pages: true,
                  }
                }
              }
            }
          }
        },
        readers: {
          include: {
            reader: { // Get full user data for readers
              select: {
                id: true,
                name: true,
                username: true,
                profileImage: true,
                _count: {
                  select: {
                    diaries: true,
                    pages: true,
                  }
                }
              }
            }
          }
        },
        _count: {
          select: {
            diaries: true,
            pages: true,
          }
        }
      }
    });

    if (!currentUser) return null;

    // Build the users array with full data
    const users = [
      // Current user
      {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        profileImage: currentUser.profileImage,
        diaryCount: currentUser._count.diaries,
        pageCount: currentUser._count.pages,
        reading: currentUser.reading.map(r => ({ readingId: r.readingId })),
        readers: currentUser.readers.map(r => ({ readerId: r.readerId })),
      },
      // Users being read
      ...currentUser.reading.map(reading => ({
        id: reading.reading.id,
        name: reading.reading.name,
        username: reading.reading.username,
        profileImage: reading.reading.profileImage,
        diaryCount: reading.reading._count.diaries,
        pageCount: reading.reading._count.pages,
        reading: [],
        readers: [],
      })),
      // Readers
      ...currentUser.readers.map(reader => ({
        id: reader.reader.id,
        name: reader.reader.name,
        username: reader.reader.username,
        profileImage: reader.reader.profileImage,
        diaryCount: reader.reader._count.diaries,
        pageCount: reader.reader._count.pages,
        reading: [],
        readers: [],
      }))
    ];

    // Remove duplicates
    const uniqueUsers = users.filter((user, index, self) => 
      index === self.findIndex(u => u.id === user.id)
    );

    return uniqueUsers;
  } catch (error) {
    console.error('Error fetching connections:', error);
    return [];
  }
}