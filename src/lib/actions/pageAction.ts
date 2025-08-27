"use server";

import { cache } from "react";
import { prisma, authSessionServer } from "../auth";

// import { cache } from "react";

export async function getPages(username?: string) {
    const userData = await authSessionServer();

    if (!userData) {
        throw new Error("User not authenticated");
    }
    if (!username) {
        const pages = await prisma.page.findMany({
            where: {
                isPublic: true,
            },
            select:{
                id: true,
                pageImageUrl: true,
                createdAt: true,
                diaryId: true,
            }
        })
        return pages;
    }
    // console.log(username, "username in getDiaries", userData.user.username);
    try {
        const pages = await prisma.page.findMany({
            where: {
                isPublic: true,
                diary: { userId: userData.user.id }

            },
            select:{
                id: true,
                pageImageUrl: true,
                createdAt: true,
                diaryId: true,
            }
        })
        return pages;

    } catch (error) {
        console.error("Error fetching diaries:", error);
        return null;
    }
}