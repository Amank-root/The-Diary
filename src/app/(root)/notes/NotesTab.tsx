import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NoteEditor from '@/components/singleton/NoteEditor';
import { getAllUserNotes, getFriendsNotes } from '@/lib/actions/notesAction';

async function NotesTab() {
  const getUserNotes = getAllUserNotes();
  const getFriendsNotesOfUser = getFriendsNotes();
  const [userNotesResult, friendsNotesResult] = await Promise.all([
    getUserNotes,
    getFriendsNotesOfUser,
  ]);
  const userNotesRaw = Array.isArray(userNotesResult) ? userNotesResult : [];
  const friendsNotesRaw = Array.isArray(friendsNotesResult)
    ? friendsNotesResult
    : [];

  // Transform notes to match StickyNote interface
  const transformNote = (note: any) => ({
    id: note.id,
    text: note.text,
    color: note.color,
    position:
      typeof note.position === 'string'
        ? JSON.parse(note.position)
        : note.position || { x: 100, y: 100 },
  });

  const userNotes = userNotesRaw.map(transformNote);
  const friendsNotes = friendsNotesRaw.map(transformNote);

  // // console.log('User Notes:', userNotes);

  if (userNotes.length === 0) {
    userNotes.push({
      id: '1',
      text: 'Welcome to your notes!',
      color: '#40bf4d',
      position: { x: 100, y: 100 },
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
  );
}

export default NotesTab;
