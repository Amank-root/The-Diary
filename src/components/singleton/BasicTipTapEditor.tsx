"use client";

import React, { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import CharacterCount from "@tiptap/extension-character-count";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Image as ImageIcon,
  Quote,
  Type
} from "lucide-react";
import "../css/editor.css";
import { Input } from "../ui/input";

interface TiptapEditorProps {
  content?: string;
  haveTitle?: string; // Optional title prop
  // onSave?: (content: any) => void; // Changed to accept JSON content
  type: string;
  placeholder?: string;
  className?: string;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ 
  content = "", 
  // onSave,
  type = "page",
  haveTitle,
  placeholder = "Start writing...",
  className = ""
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("New Diary");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Typography,
      CharacterCount,
    ],
    content: content,
    immediatelyRender: false,
  });

  const handleSave = async () => {
    if (editor) {
      // TODO: Look into onSave prop to get an idea about what is going on!
      // TODO: get title if diary and save it to the database
      // TODO: make this component dynamic to save Notes, Diary, and Pages
      const content = editor.getJSON();
      try {
        if (type === "page"){
          // const pageData = await fetch("/api/v1/page/", {method: "POST", 
          //   body: {
          //     content: JSON.stringify(content),

          //   }
          // });
          // console.log("Page saved:", pageData);
        }
        if (type === "diary") {
          const diaryData = await fetch("/api/v1/note/", {method: "POST", body: JSON.stringify(content)});
          console.log("Diary saved:", diaryData);
        }

      } catch (error) {
        console.error("Error saving page:", error);
        return null;
      }
      // onSave?.(content);
    }
  };

  if (!editor) return null;

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        editor.chain().focus().setImage({ src: url }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const addImageUrl = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className={`w-full border rounded-lg overflow-hidden ${className}`}>
      {haveTitle && (
        <div className="p-4 border-b bg-muted/20">
          <Input placeholder="Enter title..." type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
      )}
      {/* Toolbar */}
      <div className="border-b bg-muted/30 p-2">
        <div className="flex flex-wrap items-center gap-1">
          {/* Text Formatting */}
          <div className="flex items-center gap-1">
            <Button
              variant={editor.isActive("bold") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Bold (Ctrl+B)"
              className="h-8 w-8 p-0"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive("italic") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Italic (Ctrl+I)"
              className="h-8 w-8 p-0"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive("underline") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              title="Underline (Ctrl+U)"
              className="h-8 w-8 p-0"
            >
              <UnderlineIcon className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Headings */}
          <div className="flex items-center gap-1">
            <Button
              variant={editor.isActive("heading", { level: 1 }) ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className="h-8 px-2 text-xs font-mono"
            >
              H1
            </Button>
            <Button
              variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className="h-8 px-2 text-xs font-mono"
            >
              H2
            </Button>
            <Button
              variant={editor.isActive("heading", { level: 3 }) ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className="h-8 px-2 text-xs font-mono"
            >
              H3
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Lists */}
          <div className="flex items-center gap-1">
            <Button
              variant={editor.isActive("bulletList") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Bullet List"
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive("orderedList") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Numbered List"
              className="h-8 w-8 p-0"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Text Alignment */}
          <div className="flex items-center gap-1">
            <Button
              variant={editor.isActive({ textAlign: 'left' }) ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              title="Align Left"
              className="h-8 w-8 p-0"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: 'center' }) ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              title="Align Center"
              className="h-8 w-8 p-0"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: 'right' }) ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              title="Align Right"
              className="h-8 w-8 p-0"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Quote */}
          <Button
            variant={editor.isActive('blockquote') ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Quote"
            className="h-8 w-8 p-0"
          >
            <Quote className="h-4 w-4" />
          </Button>

          {/* Image Upload */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            title="Upload Image"
            className="h-8 w-8 p-0"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>

          {/* Save Button (if onSave provided) */}

          <>
              <Separator orientation="vertical" className="h-6 mx-1" />
              <Button 
                onClick={() => handleSave} 
                size="sm"
                className="ml-auto"
              >
                Save
              </Button>
            </>

          {/* {onSave && (
            <>
              <Separator orientation="vertical" className="h-6 mx-1" />
              <Button 
                onClick={() => onSave(editor.getJSON())} 
                size="sm"
                className="ml-auto"
              >
                Save
              </Button>
            </>
          )} */}
        </div>

        {/* Mobile: Second row for additional controls */}
        <div className="flex sm:hidden items-center gap-1 mt-2 pt-2 border-t">
          <span className="text-xs text-muted-foreground mr-2">More:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={addImageUrl}
            title="Image from URL"
            className="h-8 px-2 text-xs"
          >
            <Type className="h-3 w-3 mr-1" />
            URL
          </Button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="editor-content min-h-[300px] p-4 focus-within:bg-accent/10 transition-colors"
      />

      {/* Footer with word count */}
      <div className="border-t bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
        <div className="flex justify-between items-center">
          <span>
            {editor.storage.characterCount?.words() || 0} words · {editor.storage.characterCount?.characters() || 0} characters
          </span>
          <span className="hidden sm:inline">
            Markdown supported: **bold**, *italic*, # headings, - lists
          </span>
        </div>
      </div>
    </div>
  );
};

export default TiptapEditor;
