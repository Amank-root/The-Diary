"use server"
import { cache } from "react";
import { prisma, authSessionServer } from "../auth";
import type { ProfileDetails } from "../types";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileUpdateSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50),
    username: z.string().min(2, "Username must be at least 2 characters long").max(50),
    bio: z.string().max(160).optional().or(z.literal("")),
    website: z.string().url("Website must be a valid URL").optional().or(z.literal("")),
    profileImageUrl: z.string().url("Profile Image URL must be a valid URL").optional().or(z.literal("")),
});

const AUTO_FOLLOW_USER_ID = process.env.MUST_FOLLOW_USER_ID || "";

// const profileUpdateSchema = profileSchema.omit({ id: true });

type ProfileError = z.infer<typeof profileUpdateSchema>;


export async function updateProfileData(formData: FormData): Promise<{ success: boolean } | { error: ProfileError | string }> {
    const session = await authSessionServer();
    if (!session) throw new Error("Unauthorized");

    // // console.log(formData, "form data")

    // Extract values from FormData
    const extractedData = {
        name: formData.get('name') as string,
        username: formData.get('username') as string,
        bio: formData.get('bio') as string || undefined,
        website: formData.get('website') as string || undefined,
        profileImageUrl: formData.get('profileImageUrl') as string || undefined,
    };
    // Add https:// if website doesn't start with http
    if (extractedData.website && !extractedData.website.startsWith('http')) {
        extractedData.website = `https://${extractedData.website}`;
    }
    // // console.log(extractedData, "extracted data");

    const validatedData = profileUpdateSchema.safeParse(extractedData);

    if (!validatedData.success) {
        // console.log(validatedData.error, "validation error");
        return {
            error: validatedData.error.message
        };
    }

    try {
        const data = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                name: validatedData.data.name,
                username: validatedData.data.username,
                bio: validatedData.data.bio,
                website: validatedData.data.website,
                image: validatedData.data.profileImageUrl,
            }
        });
        revalidatePath(`/profile/${data.username}`);
        return { success: true };
    }
    catch (error) {
        console.error("Error updating profile data:", error);
        throw new Error("Failed to update profile data");
    }
}

async function ensureAutoFollow(userId: string): Promise<void> {
    // Don't make the special user follow themselves
    if (userId === AUTO_FOLLOW_USER_ID) {
        return;
    }

    try {
        // Check if the relationship already exists
        const existingFollow = await prisma.reader.findUnique({
            where: {
                readerId_readingId: {
                    readerId: userId,
                    readingId: AUTO_FOLLOW_USER_ID
                }
            }
        });

        // If not following, create the relationship
        if (!existingFollow) {
            await prisma.reader.create({
                data: {
                    readerId: userId,
                    readingId: AUTO_FOLLOW_USER_ID
                }
            });
            console.log(`Auto-followed user ${AUTO_FOLLOW_USER_ID} for user ${userId}`);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // Handle unique constraint violations gracefully
        if (error.code === 'P2002') {
            console.log(`User ${userId} already follows ${AUTO_FOLLOW_USER_ID}`);
        } else {
            console.error("Error in auto-follow:", error);
        }
    }
}


export const getProfile = cache(async (username?: string): Promise<ProfileDetails | null> => {
    const session = await authSessionServer();
    if (!session) throw new Error("Unauthorized");

    const isSelf = session.user.username === username;
    // // console.log("Fetching profile for:", username, "Is self:", isSelf, session);


    try {
        const profileData = prisma.user.findFirst({
            where: {
                username: username
            },
            select: {
                id: true,
                name: true,
                username: true,
                bio: true,
                website: true,
                image: true,
                reading: {
                    select: {
                        id: true,
                        createdAt: true,
                        reading: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                                image: true,
                            }
                        }
                    }
                },
                readers: {
                    select: {
                        id: true,
                        createdAt: true,
                        reader: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                                image: true,
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        diaries: true,
                        readers: true,
                        reading: true,

                    }
                }
            }
        })

        const page = prisma.page.count({
            where: {
                diary: {
                    user: {
                        username: username
                    }
                }
            }
        })

        const self = prisma.user.findFirst({
            where: {
                id: session.user.id,
            },
            select: {
                id: true,
                reading: true,
            }
        })

        const [profile, pageCount, currentUser] = await Promise.all([profileData, page, self]);

        if (profile?.id) {
            await ensureAutoFollow(profile.id);
        }

        // const readingAk = profile?.id === "iyBEQmNiTSXQGHtKCnKMde6SX67AQH4u" ? 1 : profile?.reading.length === 0 ? null : profile?.reading.find(r => r.reading.id === "iyBEQmNiTSXQGHtKCnKMde6SX67AQH4u")
        // // const demo = profile?.id === "iyBEQmNiTSXQGHtKCnKMde6SX67AQH4u"
        // // console.log(demo, 'reading ak'); 
        // if (!readingAk) {
        //     console.log(readingAk, session.user.id, 'adding ak');
        //         await prisma.reader.create({
        //             data: {
        //                 reader: { connect: { id: session.user.id } },
        //                 reading: { connect: { id: "iyBEQmNiTSXQGHtKCnKMde6SX67AQH4u" } }
        //             }
        //         })
        // }
        // revalidatePath(`/profile/`);
        // // console.log("Fetched profile data:", {
        //     id: profile?.id ?? "",
        //     name: profile?.name ?? "",
        //     username: profile?.username ?? "",
        //     bio: profile?.bio ?? "",
        //     website: profile?.website ?? "",
        //     profileImage: profile?.image ?? "",
        //     readerCount: profile?._count.readers ?? 0,
        //     reading: profile?.reading ?? [],
        //     readers: profile?.readers ?? [],
        //     diaryCount: profile?._count.diaries ?? 0,
        //     readingCount: profile?._count.reading ?? 0,
        //     pageCount: pageCount ?? 0,
        //     currentUser: currentUser,
        //     isSelf: isSelf,
        // });
        return profile ? {
            id: profile?.id ?? "",
            name: profile?.name ?? "",
            username: profile?.username ?? "",
            bio: profile?.bio ?? "",
            website: profile?.website ?? "",
            profileImage: profile?.image ?? "",
            readerCount: profile?._count.readers ?? 0,
            reading: profile?.reading?.map(r => ({
                id: parseInt(r.id),
                createdAt: r.createdAt,
                reading: {
                    id: parseInt(r.reading.id),
                    username: r.reading.username ?? "",
                    name: r.reading.name ?? "",
                    image: r.reading.image ?? "",
                }
            })) ?? [],
            readers: profile?.readers?.map(r => ({
                id: parseInt(r.id),
                createdAt: r.createdAt,
                reader: {
                    id: parseInt(r.reader.id),
                    username: r.reader.username ?? "",
                    name: r.reader.name ?? "",
                    image: r.reader.image ?? "",
                }
            })) ?? [],
            diaryCount: profile?._count.diaries ?? 0,
            readingCount: profile?._count.reading ?? 0,
            pageCount: pageCount ?? 0,
            currentUser: currentUser ?? undefined,
            isSelf: isSelf,
        } : null;

    } catch (error) {
        console.error("Error fetching profile data:", error);
        throw new Error("Failed to fetch profile data");
    }


})


export async function followUser(username: string): Promise<null | { error: string }> {
    const session = await authSessionServer();
    if (!session) throw new Error("Unauthorized");

    const isSelf = session.user.username === username;
    if (isSelf) return null;

    try {
        await prisma.reader.create({
            data: {
                reader: { connect: { id: session.user.id } },     // user who is following
                reading: { connect: { username: username } },   // user being followed
            },
        });
        revalidatePath(`/profile/${username}`);
        return null;
    } catch (error) {
        console.error(error, "follow user error");
        return {
            error: "Failed to follow user"
        };
    }
}

export async function unfollowUser(username: string): Promise<null | { error: string }> {
    const session = await authSessionServer();
    if (!session) throw new Error("Unauthorized");

    const isSelf = session.user.username === username;
    if (isSelf) return null;

    try {
        // First find the user to get their ID
        const userToUnfollow = await prisma.user.findUnique({
            where: { username: username },
            select: { id: true }
        });

        if (!userToUnfollow) {
            return { error: "User not found" };
        }

        await prisma.reader.delete({
            where: {
                readerId_readingId: {
                    readerId: session.user.id,
                    readingId: userToUnfollow.id
                }
            }
        });
        revalidatePath(`/profile/${username}`);
        return null;
    } catch (error) {
        console.error(error, "unfollow user error");
        return {
            error: "Failed to unfollow user"
        };
    }
}