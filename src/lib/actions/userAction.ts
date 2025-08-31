// TODO: implement Saved    

"use server";
import { prisma, authSessionServer } from '@/lib/auth';
import { cache } from 'react';


export const getReadingUsersPosts = cache(async () =>{
    const session = await authSessionServer();
    if (!session) return null;

    const userId = session.user.id;
    let getReading;
    let notes;
    let pages;

    try {
        getReading = await prisma.user.findFirst({
            where: { id: userId },
            select: {
                reading: true,
            }
        });
        // // console.log(getReading, 'get reading users');
        if (!getReading) return [];
    
        if (getReading.reading.length === 0) return [];
    } catch (error) {
        console.error("Error fetching reading users:", error);
        throw new Error("Failed to fetch reading users");
    }

    try {
        notes = prisma.note.findMany({
            where: {
                createdAt: {
                    gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // last 24 hours
                },
                userId: {
                    in: getReading.reading.map((user) => user.readingId)
                },
            },
            include: {
                user: {
                    select: {
                        image: true
                    }
                }
            },
            distinct: ['userId'],
            orderBy: {
                createdAt: 'desc'
            }
        });
    } catch (error) {
        console.error("Error fetching notes from reading users:", error);
        throw new Error("Failed to fetch notes from reading users");
    }
    // // console.log(notes, 'notes from reading users');

    try {
        pages = prisma.page.findMany({
            where: {
                isPublic: true,
                diary: {
                    userId: {
                        in: getReading?.reading?.map((user) => user.readingId) || []
                    }
                }
            },
            select: {
                id: true,
                createdAt: true,
                pageImageUrl: true,
                diaryId: true,
                diary: {
                    select: {
                        title: true,
                        user: {
                            select: {
                                username: true,
                                image: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } catch (error) {
        console.error("Error fetching pages from reading users:", error);
        throw new Error("Failed to fetch pages from reading users");
    }

    const [getNotes, getPages] = await Promise.all([notes, pages]);
    // console.log(getNotes, 'get notes from reading users');
    // // console.log(getPages, 'get pages from reading users');

    return { getNotes, getPages };
})

// import { authSessionServer, prisma } from "../auth";

// export const getUserSaved = async () => {
//     const session = await authSessionServer();
//     if (!session) return null;

//     const userId = session.user.id;

//     const saved = await prisma.saved.findMany({
//         where: { userId },
//         include: { user: {
//             select: {
//                 diaries: {
//                     where:{
//                         id: 
//                     }
//                 }
//             }
//         } },
//     });

//     return saved;
// }