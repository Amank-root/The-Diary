'use client'
// import TiptapEditor from "@/components/singleton/TipTapEditoe";
import BasicTipTapEditor from "@/components/singleton/BasicTipTapEditor";
import { toast } from "sonner";

export default function EditorPage() {
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">New Diary Entry</h1>
      {/* <div className="not-prose editor-wrapper">
        <BasicTipTapEditor
          placeholder="Share what's on your mind today..."
          onSave={(content) => {
            console.log('Saved content:', content);
            toast.success("Diary entry saved successfully!");
            //   setIsEditorOpen(false);
          }}
          className="w-full"
        />
      </div> */}
    </main>
  );
}
