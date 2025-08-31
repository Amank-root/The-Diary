// types/react-sticky-notes.d.ts
declare module '@react-latest-ui/react-sticky-notes' {
  import * as React from 'react';

  export interface StickyNote {
    text: string;
    color: string;
    id: string | number;
    position: {
      x: number;
      y: number;
    };
    // [key: string]: any; // for additional custom fields
  }

  export interface ReactStickyNotesProps {
    notes: StickyNote[];
    containerWidth?: string | number;
    containerHeight?: string | number;
    noteWidth?: number;
    noteHeight?: number;
    colors?: string[];
    editable?: boolean;
    onChange?: (
      type: 'add' | 'delete' | 'update',
      payload: StickyNote,
      updatedNotes: StickyNote[]
    ) => void;
    onBeforeChange?: (
      type: 'add' | 'delete' | 'update',
      payload: StickyNote,
      currentNotes: StickyNote[]
    ) => boolean;

  }

  const ReactStickyNotes: React.FC<ReactStickyNotesProps>;
  export default ReactStickyNotes;
}
