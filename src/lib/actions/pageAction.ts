"use server";

import { cache } from "react";
import { prisma, authSessionServer } from "../auth";

// import { cache } from "react";

export async function getPages(username?: string) {
    const userData = await authSessionServer();
    // console.log(username, 'userData in getPages');
    if (!userData) {
        throw new Error("User not authenticated");
    }
    if (!username) {
        // console.log("inside username!")
        const pages = await prisma.page.findMany({
            where: {
                isPublic: true,
            },
            select: {
                id: true,
                pageImageUrl: true,
                createdAt: true,
                diaryId: true,
                diary: {
                    select: {
                        title: true,
                        user: {
                            select: {
                                username: true,
                                image: true,
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return pages;
    }
    // console.log(username, "username in getDiaries", userData.user.username);
    try {
        // console.log("inside username", username);
        const pages = await prisma.page.findMany({
            where: {
                isPublic: true,
                diary: { user: {
                    username: username
                } }

            },
            select: {
                id: true,
                pageImageUrl: true,
                createdAt: true,
                diaryId: true,
                diary: {
                    select: {
                        title: true,
                        user: {
                            select: {
                                username: true,
                                image: true,
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return pages;

    } catch (error) {
        console.error("Error fetching diaries:", error);
        return null;
    }
}

export const getPageById = cache(async (pageId: string) => {
    const session = await authSessionServer();
    if (!session?.session) {
        throw new Error("Unauthorized");
    }
    try {
        const page = await prisma.page.findUnique({
            where: {
                id: pageId
            },
            select: {
                id: true,
                pageImageUrl: true,
                createdAt: true,
                diaryId: true,
                diary: {
                    select: {
                        title: true,
                        user: {
                            select: {
                                username: true,
                                image: true,
                            }
                        }
                    }
                }
            }
        })
        return page;

    } catch (error) {
        console.error("Error fetching page:", error);
        throw new Error("Failed to fetch page");
    }
})