export interface Post {
    id: number;
    image: string;
    likes: number;
    comments: number;
}

export interface DiaryEntry {
    id: number;
    title: string;
    date: string;
    preview: string;
    image: string;
}

export interface ProfileHeader {
    name: string;
    id?: string;
    username: string;
    bio: string;
    website: string;
    profileImage: string;
    isSelf?: boolean;
}

export interface ProfileDetails extends ProfileHeader {
    readerCount: number;
    readingCount: number;
    pageCount: number;
    reading: Array<any>;
    readers: Array<any>;
    diaryCount: number;
}