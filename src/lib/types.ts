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
  currentUser?: {
    id: string;
    reading: {
      id: string;
      createdAt: Date;
      readerId: string;
      readingId: string;
    }[];
  };
}

export interface ProfileDetails extends ProfileHeader {
  readerCount: number;
  readingCount: number;
  pageCount: number;
  reading: {
    id: number;
    createdAt: Date;
    reading: {
      id: number;
      username: string;
      name: string;
      image: string;
    };
  }[];
  readers: {
    id: number;
    createdAt: Date;
    reader: {
      id: number;
      username: string;
      name: string;
      image: string;
    };
  }[];
  diaryCount: number;
}
