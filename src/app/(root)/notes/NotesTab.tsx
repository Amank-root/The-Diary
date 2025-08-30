import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NoteEditor from '@/components/singleton/NoteEditor'
import { getAllUserNotes, getFriendsNotes } from '@/lib/actions/notesAction'

async function NotesTab() {
    const getUserNotes = getAllUserNotes();
    const getFriendsNotesOfUser = getFriendsNotes();
    const [userNotesResult, friendsNotesResult] = await Promise.all([getUserNotes, getFriendsNotesOfUser]);
    const userNotes = Array.isArray(userNotesResult) ? userNotesResult : [];
    const friendsNotes = Array.isArray(friendsNotesResult) ? friendsNotesResult : [];

    console.log('User Notes:', userNotes);

    if (userNotes.length === 0) {
        userNotes.push({
            id: '1',
            createdAt: new Date(),
            userId: '',
            title: null,
            position: { x: 100, y: 100 },
            text: 'Welcome to your notes!',
            color: '#ff0',
        });
    }

    return (
        <Tabs defaultValue="yours">
            <TabsList>
                <TabsTrigger value="yours">Your Notes</TabsTrigger>
                <TabsTrigger value="friends">Friends Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="yours">
                <NoteEditor notesData={userNotes} />
            </TabsContent>
            <TabsContent value="friends">
                <NoteEditor notesData={friendsNotes} />
            </TabsContent>
        </Tabs>
    )
}

export default NotesTab