'use server';
import { prisma } from '@/lib/prisma';
import { authSessionServer } from '../auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { cache } from 'react';

const CreateDiarySchema = z.object({
  title: z.string().min(2).max(100).default('Untitled'),
  coverImageUrl: z.string().url().optional(),
  type: z
    .enum(['PERSONAL', 'GENERAL', 'SPECIAL', 'TRIVIAL'])
    .default('PERSONAL'),
});

export async function createDiary(formData: FormData) {
  const userData = await authSessionServer();
  const defaultImages = {
    SPECIAL:
      'https://res.cloudinary.com/dp3vyfcyc/image/upload/v1755971357/Modern_Botanical_Journal_Cover_Diary_wedo3z.png',
    PERSONAL:
      'https://res.cloudinary.com/dp3vyfcyc/image/upload/v1755971150/Modern_Botanical_Journal_Cover_Diary_2_cwdlnq.png',
    GENERAL:
      'https://res.cloudinary.com/dp3vyfcyc/image/upload/v1755971277/Modern_Botanical_Journal_Cover_Diary_1_dghre2.png',
    TRIVIAL:
      'https://res.cloudinary.com/dp3vyfcyc/image/upload/v1755970932/Modern_Botanical_Journal_Cover_Diary_3_g3gq9w.png',
  };

  // console.log("Form Data received:", formData);

  const extracted = {
    title: formData.get('title')?.toString(),
    coverImageUrl: formData.get('coverImageUrl')
      ? formData.get('coverImageUrl')?.toString()
      : defaultImages[
          formData
            .get('type')
            ?.toString()
            .toUpperCase() as keyof typeof defaultImages
        ],
    type: formData.get('type')?.toString().toUpperCase(),
  };

  const validated = CreateDiarySchema.safeParse(extracted);

  if (!validated.success) {
    console.error('Invalid diary data:', validated.error);
    throw new Error('Invalid diary data');
  }

  try {
    await prisma.diary.create({
      data: {
        title: validated.data.title,
        user: {
          connect: { id: userData?.user.id },
        },
        types: validated.data.type,
        diaryCoverImage:
          validated.data.coverImageUrl ?? defaultImages[validated.data.type],
      },
    });
  } catch (error) {
    console.error('Error creating diary:', error);
    throw new Error('Failed to create diary');
  }

  revalidatePath('/diary');
}

export const getDiaries = cache(async (username?: string) => {
  const userData = await authSessionServer();

  if (!userData) {
    throw new Error('User not authenticated');
  }
  // // console.log(username, "username in getDiaries", userData.user.username);
  try {
    const diaries = await prisma.diary.findMany({
      where: {
        user: {
          username: username ? username : userData.user.username,
        },
        types: {
          in: username
            ? ['PERSONAL', 'GENERAL', 'TRIVIAL']
            : ['PERSONAL', 'GENERAL', 'SPECIAL', 'TRIVIAL'],
        },
      },
      select: {
        id: true,
        title: true,
        diaryCoverImage: true,
        createdAt: true,
        types: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    // revalidatePath(`/profile/${username}/diary`);
    return diaries;
  } catch (error) {
    console.error('Error fetching diaries:', error);
    return null;
  }
});

export const getDiariesWithPages = cache(async (username?: string) => {
  const userData = await authSessionServer();

  if (!userData) {
    throw new Error('User not authenticated');
  }
  // // console.log(username, "username in getDiaries", userData.user.username);
  try {
    const diaries = await prisma.diary.findMany({
      where: {
        user: {
          username: username ? username : userData.user.username,
        },
        types: {
          in: username
            ? ['PERSONAL', 'GENERAL', 'TRIVIAL']
            : ['PERSONAL', 'GENERAL', 'SPECIAL', 'TRIVIAL'],
        },
      },
      select: {
        id: true,
        title: true,
        diaryCoverImage: true,
        createdAt: true,
        types: true,
        pages: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    // revalidatePath(`/profile/${username}/diary`);
    return diaries;
  } catch (error) {
    console.error('Error fetching diaries:', error);
    return null;
  }
});

export const getDiaryById = cache(async (diaryId: string) => {
  const userData = await authSessionServer();

  if (!userData) {
    throw new Error('User not authenticated');
  }

  try {
    const diary = await prisma.diary.findUnique({
      where: {
        id: diaryId,
      },
      select: {
        id: true,
        title: true,
        diaryCoverImage: true,
        createdAt: true,
        updatedAt: true,
        types: true,
        pages: true,
      },
    });
    return diary;
  } catch (error) {
    console.error('Error fetching diary:', error);
    return null;
  }
});
