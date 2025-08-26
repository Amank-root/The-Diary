"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
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


function ToolBar({ editor, handleSave, addImageUrl, fileInputRef, saveBtnDisabled }: { editor: ReturnType<typeof useEditor>, handleSave: () => void, addImageUrl: () => void, fileInputRef: React.RefObject<HTMLInputElement | null>, saveBtnDisabled: boolean }) {
    return (
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
                    onClick={() => fileInputRef?.current?.click()}
                    title="Upload Image"
                    className="h-8 w-8 p-0"
                >
                    <ImageIcon className="h-4 w-4" />
                </Button>

                {/* Save Button (if onSave provided) */}

                <>
                    <Separator orientation="vertical" className="h-6 mx-1" />
                    <Button
                        onClick={handleSave}
                        size="sm"
                        className="ml-auto"
                        disabled={saveBtnDisabled}
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
    )
}

export default ToolBar