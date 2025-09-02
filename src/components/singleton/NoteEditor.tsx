import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import ReactStickyNotes from '@react-latest-ui/react-sticky-notes';
import type { StickyNote, StickyNotePayload } from '@react-latest-ui/react-sticky-notes';
import { toast } from 'sonner';
import { memo } from 'react';

interface NoteEditorProps {
  notesData?: StickyNote[];
}

const NoteEditor = memo(function NoteEditor({ notesData }: NoteEditorProps) {
    const [notes, setNotes] = useState<StickyNote[]>(notesData || []);

    // console.log('Initial notes data:', notesData);

    const debouncedSave = useDebouncedCallback((note: StickyNotePayload) => {
        createOrUpdateNote(note);
    }, 1000);

    if (notes && notes.length === 0) {
        return <div className='p-4 text-center text-gray-500'>No notes available.</div>;
    }

    const getRandomColor = () => {
        const colors = ['#ff0', '#0f0', '#00f', '#f00', '#ff00f', '#0ffff'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // Create or update a note via API
    const createOrUpdateNote = async (note: StickyNotePayload) => {
        // Validate required fields
        // console.log('Creating/updating note:', note);
        if (!note.data.id) {
            console.error('Cannot save note - missing ID:', note);
            toast.error('Error: Note ID is missing');
            return;
        }
        if (!note.data.text || note.data.text.trim() === '') {
            // console.log('Skipping save - note has no text');
            return;
        }

        try {
            // console.log("Saving note:", {
            //     id: note.data.id,
            //     text: note.data.text?.substring(0, 50) + '...',
            //     color: note.data.color,
            //     position: { x: note.data.x, y: note.data.y }
            // });

            const response = await fetch('/api/v1/note', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: note.data.id,
                    text: note.data.text,
                    color: note.data.color || getRandomColor(),
                    position: {
                        x: note.data.x || 0,
                        y: note.data.y || 0
                    }
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to save note: ${response.statusText} - ${errorText}`);
            }

            const result = await response.json();
            // console.log('Note saved successfully:', result);
            toast.success('Note saved!');
            return result;
        } catch (error) {
            console.error('Error saving note:', error);
            toast.error('Failed to save note. Please try again.');
        }
    };

    // Delete a note via API
    const deleteNote = async (noteId: string) => {

        if (!noteId) {
            console.error('Cannot delete note - missing ID');
            toast.error('Error: Note ID is missing');
            return;
        }

        try {
            // console.log('Deleting note:', noteId);

            const response = await fetch(`/api/v1/note?id=${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete note: ${response.statusText} - ${errorText}`);
            }

            // console.log('Note deleted successfully:', noteId);
            toast.success('Note deleted!');
        } catch (error) {
            console.error('Error deleting note:', error);
            toast.error('Failed to delete note.');
        }
    };

    // Debounced save function - waits 1 second after user stops typing
    // const debouncedSave = useDebouncedCallback((note: ReactStickyNotesProps['notes'][number]) => {
    //     createOrUpdateNote(note);
    // }, 1000);

    return (
        <div className='w-full overflow-x-hidden'>
            <ReactStickyNotes
                notes={notes}
                colors={['#ff0', '#0f0', '#0ff', '#f0f', '#fa0', '#0af']}
                containerWidth="100%"
                containerHeight="800px"
                noteWidth={200}
                noteHeight={200}
                editable={true}
                onChange={(type, payload, updatedNotes) => {
                    // Enhanced debugging
                    // console.log('=== STICKY NOTE CHANGE ===');
                    // console.log('Type:', type);
                    // console.log('update asdahsgdj:', updatedNotes);
                    // console.log('Payload:', payload);
                    // console.log('Payload:', payload.data.text);
                    // console.log('Updated Notes Count:', updatedNotes?.length);
                    // console.log('Payload Keys:', Object.keys(payload || {}));
                    // console.log('==========================');

                    // Validate payload
                    if (!payload) {
                        console.error('Payload is null/undefined');
                        return;
                    }

                    // Always update local state first
                    if (updatedNotes && Array.isArray(updatedNotes)) {
                        setNotes(updatedNotes);
                    } else {
                        console.error('updatedNotes is not valid:', updatedNotes);
                        return;
                    }

                    // Handle different types of changes
                    switch (type) {
                        case 'add':
                            if (!payload.data.id) {
                                toast.error("New note has no ID!");
                                // console.error('New note has no ID!', payload);
                            }
                            // Don't save immediately - wait for user to add text
                            break;

                        case 'update':
                            // console.log('Note updated:', payload.data.id || 'NO_ID');
                            if (!payload.data.id) {
                                toast.error("Updated note has no ID!");
                                // console.error('Updated note has no ID!', payload);
                                break;
                            }

                            if (payload.data.text && payload.data.text.trim() !== '') {
                                // // console.log('Debouncing save for note:', payload.data.id);
                                debouncedSave(payload);
                            } else {
                                // console.log('Note has no text, skipping save');
                            }
                            break;

                        case 'delete':
                            // console.log('Note deleted:', payload.data.id || 'NO_ID');

                            if (!payload.data.id) {
                                toast.error('Error while deleting note');
                                break;
                            }

                            // Cancel any pending saves for this note
                            debouncedSave.cancel();
                            // Delete from backend immediately
                            deleteNote(payload.data.id.toString());
                            break;

                        // case 'move':
                        //     // console.log('Note moved:', payload.data.id || 'NO_ID');

                        //     if (!payload.data.id) {
                        //         console.error('Moved note has no ID!', payload);
                        //         break;
                        //     }

                        //     // Only save position if note has text
                        //     if (payload.data.text && payload.data.text.trim() !== '') {
                        //         // console.log('Debouncing position save for note:', payload.data.id);
                        //         debouncedSave(payload);
                        //     }
                        //     break;

                        default:
                        // console.log('Unknown change type:', type);
                    }
                }}
            />

            {/* Enhanced debug info */}
            {process.env.NODE_ENV === 'development' && (
                <div className="fixed bottom-4 left-4 bg-black text-white p-3 rounded text-xs max-w-sm z-50">
                    <div className="font-bold mb-2">Debug Info</div>
                    <div>Total Notes: {notes.length}</div>
                    <div>Notes with text: {notes.filter(n => n.text?.trim()).length}</div>
                    <div>Notes with IDs: {notes.filter(n => n.id).length}</div>
                    <div className="text-gray-300 text-[10px] mt-2">
                        Saves after 1s of no typing
                    </div>

                    {/* Show current notes data */}
                    <div className="mt-2 text-[10px] max-h-32 overflow-y-auto">
                        <div className="text-yellow-300">Current Notes:</div>
                        {notes.map((note, index) => (
                            <div key={index} className="text-gray-300">
                                {index}: ID={note.id || 'MISSING'}, Text={note.text?.substring(0, 15) || 'EMPTY'}...
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
})

export default NoteEditor

