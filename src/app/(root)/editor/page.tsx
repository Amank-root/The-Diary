'use client'
// import TiptapEditor from "@/components/singleton/TipTapEditoe";

export default function EditorPage() {
  const handleSave = (content: string) => {
    console.log("Saved content:", content);
    // Here you would typically save to a database or local storage
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Rich Text Editor</h1>
        <p className="text-muted-foreground">
          Create beautiful diary entries with our enhanced TipTap editor.
        </p>
      </div>
      
      {/* <TiptapEditor
        placeholder="Write your diary entry here... Express your thoughts, add images, format text, and capture your memories!"
        onSave={handleSave}
        className="w-full"
      /> */}
      
      <div className="mt-8 p-4 border rounded-lg bg-muted/30">
        <h3 className="font-semibold mb-2">Editor Features:</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Rich text formatting (Bold, Italic, Underline)</li>
          <li>• Multiple heading levels (H1, H2, H3)</li>
          <li>• Lists (Bullet and Numbered)</li>
          <li>• Text alignment (Left, Center, Right)</li>
          <li>• Color picker for text</li>
          <li>• Link insertion</li>
          <li>• Image embedding</li>
          <li>• Block quotes</li>
          <li>• Mood emojis for quick expression</li>
          <li>• Undo/Redo functionality</li>
          <li>• Word and character count</li>
          <li>• Auto-save capability</li>
        </ul>
      </div>
    </div>
  );
}
