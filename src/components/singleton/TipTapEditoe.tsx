"use client";

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
// import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Palette,
  Quote,
  Undo,
  Redo,
  Save,
  Smile
} from "lucide-react";
import "../css/editor.css";

interface TiptapEditorProps {
  content?: string;
  onSave?: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ 
  content = "", 
  onSave,
  placeholder = "Start writing your diary entry...",
  className = ""
}) => {
  const [wordCount, setWordCount] = useState(0);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

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
    //   TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: content || `<p>${placeholder}</p>`,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      setWordCount(text.split(/\s+/).filter(word => word.length > 0).length);
    },
  });

  if (!editor) return null;

  const formatButtons = [
    { 
      name: "Bold", 
      icon: Bold, 
      action: () => editor.chain().focus().toggleBold().run(), 
      isActive: editor.isActive("bold"),
      shortcut: "Ctrl+B"
    },
    { 
      name: "Italic", 
      icon: Italic, 
      action: () => editor.chain().focus().toggleItalic().run(), 
      isActive: editor.isActive("italic"),
      shortcut: "Ctrl+I"
    },
    { 
      name: "Underline", 
      icon: UnderlineIcon, 
      action: () => editor.chain().focus().toggleUnderline().run(), 
      isActive: editor.isActive("underline"),
      shortcut: "Ctrl+U"
    },
  ];

  const headingButtons = [
    { 
      name: "H1", 
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), 
      isActive: editor.isActive("heading", { level: 1 })
    },
    { 
      name: "H2", 
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), 
      isActive: editor.isActive("heading", { level: 2 })
    },
    { 
      name: "H3", 
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), 
      isActive: editor.isActive("heading", { level: 3 })
    },
  ];

  const listButtons = [
    { 
      name: "Bullet List", 
      icon: List, 
      action: () => editor.chain().focus().toggleBulletList().run(), 
      isActive: editor.isActive("bulletList")
    },
    { 
      name: "Ordered List", 
      icon: ListOrdered, 
      action: () => editor.chain().focus().toggleOrderedList().run(), 
      isActive: editor.isActive("orderedList")
    },
  ];

  const alignButtons = [
    { 
      name: "Align Left", 
      icon: AlignLeft, 
      action: () => editor.chain().focus().setTextAlign('left').run(), 
      isActive: editor.isActive({ textAlign: 'left' })
    },
    { 
      name: "Align Center", 
      icon: AlignCenter, 
      action: () => editor.chain().focus().setTextAlign('center').run(), 
      isActive: editor.isActive({ textAlign: 'center' })
    },
    { 
      name: "Align Right", 
      icon: AlignRight, 
      action: () => editor.chain().focus().setTextAlign('right').run(), 
      isActive: editor.isActive({ textAlign: 'right' })
    },
  ];

  const colors = [
    "#000000", "#374151", "#6B7280", "#9CA3AF",
    "#EF4444", "#F97316", "#EAB308", "#22C55E",
    "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B"
  ];

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setShowLinkInput(false);
    }
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleSave = () => {
    const html = editor.getHTML();
    onSave?.(html);
  };

  const moods = ["😊", "😢", "😠", "😴", "🤔", "😍", "🥳", "😰"];

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Diary Editor</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{wordCount} words</Badge>
            {onSave && (
              <Button onClick={handleSave} size="sm" className="gap-2">
                <Save className="h-4 w-4" />
                Save Entry
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Toolbar */}
        <div className="border rounded-lg p-3 bg-muted/30">
          {/* Format Buttons */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center gap-1">
              {formatButtons.map((btn) => (
                <Button
                  key={btn.name}
                  variant={btn.isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={btn.action}
                  title={`${btn.name} (${btn.shortcut})`}
                  className="h-8 w-8 p-0"
                >
                  <btn.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>

            <Separator orientation="vertical" className="h-6 mx-2" />

            {/* Headings */}
            <div className="flex items-center gap-1">
              {headingButtons.map((btn) => (
                <Button
                  key={btn.name}
                  variant={btn.isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={btn.action}
                  className="h-8 px-2 text-xs font-mono"
                >
                  {btn.name}
                </Button>
              ))}
            </div>

            <Separator orientation="vertical" className="h-6 mx-2" />

            {/* Lists */}
            <div className="flex items-center gap-1">
              {listButtons.map((btn) => (
                <Button
                  key={btn.name}
                  variant={btn.isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={btn.action}
                  title={btn.name}
                  className="h-8 w-8 p-0"
                >
                  <btn.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>

            <Separator orientation="vertical" className="h-6 mx-2" />

            {/* Alignment */}
            <div className="flex items-center gap-1">
              {alignButtons.map((btn) => (
                <Button
                  key={btn.name}
                  variant={btn.isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={btn.action}
                  title={btn.name}
                  className="h-8 w-8 p-0"
                >
                  <btn.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>

            <Separator orientation="vertical" className="h-6 mx-2" />

            {/* Colors */}
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  title="Text Color"
                  className="h-8 w-8 p-0"
                >
                  <Palette className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400"
                      style={{ backgroundColor: color }}
                      onClick={() => editor.chain().focus().setColor(color).run()}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Link */}
            <Popover open={showLinkInput} onOpenChange={setShowLinkInput}>
              <PopoverTrigger asChild>
                <Button 
                  variant={editor.isActive('link') ? "default" : "ghost"} 
                  size="sm" 
                  title="Add Link"
                  className="h-8 w-8 p-0"
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <Label>Link URL</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://example.com"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addLink()}
                    />
                    <Button onClick={addLink} size="sm">Add</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Image */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={addImage}
              title="Add Image"
              className="h-8 w-8 p-0"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>

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

            <Separator orientation="vertical" className="h-6 mx-2" />

            {/* Undo/Redo */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                title="Undo"
                className="h-8 w-8 p-0"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                title="Redo"
                className="h-8 w-8 p-0"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mood Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Mood:</span>
            <div className="flex gap-1">
              {moods.map((mood) => (
                <Button
                  key={mood}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    editor.chain().focus().insertContent(` ${mood} `).run();
                  }}
                  className="h-8 w-8 p-0 text-lg hover:bg-accent"
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="border rounded-lg overflow-hidden">
          <EditorContent
            editor={editor}
            className="editor-content min-h-[300px] p-4 focus-within:bg-accent/10 transition-colors"
          />
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Words: {wordCount}</span>
            <span>Characters: {editor.storage.characterCount?.characters() || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <Smile className="h-4 w-4" />
            <span>Express yourself freely</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TiptapEditor;
