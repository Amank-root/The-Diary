'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectGroup,
  SelectValue,
} from '@/components/ui/select';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import CharacterCount from '@tiptap/extension-character-count';
import { Prisma } from '@/generated/prisma/browser';
import { toast } from 'sonner';
import * as htmlToImage from 'html-to-image';
import '../css/editor.css';

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
  Type,
  Save,
  Loader2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { usePathname, useRouter } from 'next/navigation';

type JsonValue = Prisma.JsonValue;

interface Page {
  id: string;
  content: JsonValue;
  pageNumber: number;
  pageImageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface DiaryOption {
  id: string;
  title: string;
  slug: string;
  types?: string;
  pages?: Page[] | null;
}

interface RequestBody {
  content: string;
  pageImageUrl: string;
  diaryId: string;
  pageNumber: number;
  isPublic: boolean;
}

interface TiptapEditorProps {
  content?: string;
  placeholder?: string;
  className?: string;
  initialDiaryId?: string;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
  content = '',
  placeholder = 'Start writing...',
  className = '',
  initialDiaryId = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [diaryOptions, setDiaryOptions] = useState<DiaryOption[]>([]);
  const [selectedDiaryId, setSelectedDiaryId] = useState(initialDiaryId);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const pathname = usePathname();
  const isDiaryPath = pathname.includes('/diary');
  const { replace } = useRouter();

  useEffect(() => {
    if (isDiaryPath) {
      setIsLoading(true);

      fetch(`/api/v1/diary?id=${pathname.split('/')[2] ?? ''}`)
        .then((res) => res.json())
        .then((data) => {
          const options = Array.isArray(data) ? data : [data];
          setDiaryOptions(options);
          setSelectedDiaryId(data.id ?? '');
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
          toast.error('Failed to load diary');
          replace('/diary');
        });
      // console.log("Diary path detected", data);
      setIsLoading(false);
    }
    if (!isDiaryPath) {
      setIsLoading(true);
      fetch('/api/v1/diary')
        .then((res) => res.json())
        .then((data) => {
          setDiaryOptions(data || []);
          setIsLoading(false);
          if (data.length > 0) {
            setSelectedDiaryId(data[0].id);
          } else {
            setSelectedDiaryId('');
            toast.error('No diaries found. Please create a diary first.');
            replace('/diary');
          }
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
          toast.error('Failed to load diaries');
          replace('/diary');
        });
    }
  }, [isDiaryPath, pathname, replace]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: 'max-w-full h-[200px] max-h-[300px] rounded-lg my-4',
        },
      }),
      Placeholder.configure({ placeholder }),
      Typography,
      CharacterCount,
    ],
    content,
    immediatelyRender: false,
  });

  // Function to upload blob to Cloudinary
  const uploadToCloudinary = async (blob: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', 'pageMiscellaneous');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    const data = await response.json();
    return data.secure_url;
  };

  // Function to convert HTML to PNG and upload
  const convertToImageAndUpload = useCallback(async (): Promise<
    string | null
  > => {
    if (!editor) {
      console.error('Editor not available');
      return null;
    }

    try {
      // Get the HTML content from editor
      const htmlContent = editor.getHTML();
      // console.log("HTML Content to convert:", htmlContent);

      if (
        !htmlContent ||
        htmlContent.trim() === '<p></p>' ||
        htmlContent.trim() === ''
      ) {
        console.error('No content to convert');
        toast.error('No content to convert to image');
        return null;
      }

      // Create the exact container structure you provided
      const pageDiv = document.createElement('div');
      pageDiv.className = 'page';
      pageDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 400px;
        height: 600px;
        z-index: 9999;
        opacity: 1;
        visibility: visible;
      `;

      // Create page-content div with minimal padding
      const pageContentDiv = document.createElement('div');
      pageContentDiv.className = 'page-content';
      pageContentDiv.style.cssText = `
        padding: 6px;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
      `;

      // Create page header with just date (minimal spacing)
      const pageHeaderDiv = document.createElement('h2');
      pageHeaderDiv.className = 'page-header';
      pageHeaderDiv.style.cssText = `
        font-size: 12px;
        font-weight: 600;
        margin: 0 0 4px 0;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 2px;
        font-family: Georgia, serif;
        color: #333;
      `;

      // Get current date (shorter format)
      const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      pageHeaderDiv.textContent = currentDate;

      // Create page text div with content (maximum height and minimal spacing)
      const pageTextDiv = document.createElement('div');
      pageTextDiv.className = 'page-text prose prose-sm max-w-none';
      pageTextDiv.style.cssText = `
        line-height: 1.1;
        font-size: 10px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        color: #333;
        max-width: none;
        height: calc(100% - 40px);
        overflow: hidden;
        margin: 0;
        padding: 0;
      `;

      // Clean and style the HTML content with minimal spacing
      let styledContent = htmlContent;

      // Remove conflicting styles
      styledContent = styledContent.replace(/style="[^"]*"/g, '');

      // Apply ultra-compact styling for maximum content
      styledContent = styledContent
        .replace(
          /<p>/g,
          '<p style="margin: 0 0 2px 0; color: #333; font-family: inherit; font-size: 10px; line-height: 1.1;">'
        )
        .replace(
          /<h1>/g,
          '<h1 style="font-size: 12px; margin: 0 0 3px 0; color: #333; font-family: inherit; font-weight: bold;">'
        )
        .replace(
          /<h2>/g,
          '<h2 style="font-size: 11px; margin: 0 0 3px 0; color: #333; font-family: inherit; font-weight: bold;">'
        )
        .replace(
          /<h3>/g,
          '<h3 style="font-size: 10px; margin: 0 0 2px 0; color: #333; font-family: inherit; font-weight: bold;">'
        )
        .replace(
          /<blockquote>/g,
          '<blockquote style="margin: 2px 0; padding: 1px 4px; border-left: 1px solid #ccc; background: #f9f9f9; font-style: italic; color: #333; font-family: inherit;">'
        )
        .replace(
          /<ul>/g,
          '<ul style="margin: 2px 0; padding-left: 8px; color: #333; font-family: inherit;">'
        )
        .replace(
          /<ol>/g,
          '<ol style="margin: 2px 0; padding-left: 8px; color: #333; font-family: inherit;">'
        )
        .replace(
          /<li>/g,
          '<li style="margin: 0; color: #333; font-family: inherit;">'
        )
        .replace(
          /<strong>/g,
          '<strong style="color: #333; font-family: inherit; font-weight: bold;">'
        )
        .replace(
          /<em>/g,
          '<em style="color: #333; font-family: inherit; font-style: italic;">'
        )
        .replace(/<br>/g, '<br>')
        .replace(/&nbsp;/g, ' ');

      pageTextDiv.innerHTML = styledContent;

      // Create page footer with page number (black color)
      const pageFooterDiv = document.createElement('div');
      pageFooterDiv.className = 'page-footer';
      pageFooterDiv.style.cssText = `
        position: absolute;
        bottom: 4px;
        right: 6px;
        text-align: center;
        font-size: 12px;
        color: #000;
        margin: 0;
        font-family: Georgia, serif;
      `;
      pageFooterDiv.textContent = '1'; // Page number

      // Assemble the structure
      pageContentDiv.appendChild(pageHeaderDiv);
      pageContentDiv.appendChild(pageTextDiv);
      pageContentDiv.appendChild(pageFooterDiv);
      pageDiv.appendChild(pageContentDiv);

      // Append to body temporarily
      document.body.appendChild(pageDiv);

      // Force reflow
      void pageDiv.offsetHeight;

      // Wait for styles to load
      await new Promise((resolve) => setTimeout(resolve, 200)); // console.log("About to convert element:", pageDiv);
      // console.log("Element dimensions:", pageDiv.offsetWidth, pageDiv.offsetHeight);

      // Convert to PNG using html-to-image with high quality settings for sharp image
      const dataUrl = await htmlToImage.toPng(pageDiv, {
        width: 400,
        height: 600,
        quality: 1.0, // Maximum quality
        backgroundColor: '#fdfaf4',
        pixelRatio: 3, // Higher pixel ratio for sharp image
        cacheBust: true,
        imagePlaceholder: undefined,
        skipAutoScale: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          imageRendering: 'crisp-edges', // Sharp image rendering
          WebkitFontSmoothing: 'antialiased',
          fontSmooth: 'always',
        } as unknown as Partial<CSSStyleDeclaration>,
      });

      // console.log("Conversion completed, dataUrl length:", dataUrl.length);

      // Remove temporary div
      document.body.removeChild(pageDiv);

      if (!dataUrl || dataUrl === 'data:,') {
        throw new Error('Failed to generate image - empty dataUrl');
      }

      // Convert dataUrl to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // console.log("Blob size:", blob.size);

      if (blob.size === 0) {
        throw new Error('Generated image is empty');
      }

      // Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(blob);
      // console.log("Uploaded to Cloudinary:", imageUrl);

      return imageUrl;
    } catch (error) {
      console.error('Error converting to image:', error);
      return null;
    }
  }, [editor]);

  // Fallback canvas method
  const convertToImageAndUploadCanvas = useCallback(async (): Promise<
    string | null
  > => {
    if (!editor) {
      console.error('Editor not available');
      return null;
    }

    try {
      // const htmlContent = editor.getHTML();
      const textContent = editor.getText();

      if (!textContent.trim()) {
        toast.error('No content to convert');
        return null;
      }

      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Fill background
      ctx.fillStyle = '#fdfaf4';
      ctx.fillRect(0, 0, 400, 600);

      // Add border
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, 400, 600);

      // Add date header
      ctx.fillStyle = '#333';
      ctx.font = '12px Georgia';
      ctx.textAlign = 'center';
      const dateText = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      ctx.fillText(dateText, 200, 25);

      // Add header line
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, 35);
      ctx.lineTo(380, 35);
      ctx.stroke();

      // Add content
      const lines = textContent.split('\n');
      ctx.fillStyle = '#333';
      ctx.font = '10px Georgia';
      ctx.textAlign = 'left';

      let y = 55;
      const lineHeight = 12;
      const maxWidth = 360;

      lines.forEach((line) => {
        if (y > 570) return; // Stop if we run out of space

        if (line.trim()) {
          // Word wrap
          const words = line.split(' ');
          let currentLine = '';

          words.forEach((word) => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const metrics = ctx.measureText(testLine);

            if (metrics.width > maxWidth && currentLine) {
              ctx.fillText(currentLine, 20, y);
              currentLine = word;
              y += lineHeight;
            } else {
              currentLine = testLine;
            }
          });

          if (currentLine) {
            ctx.fillText(currentLine, 20, y);
            y += lineHeight;
          }
        } else {
          y += lineHeight / 2; // Small gap for empty lines
        }
      });

      // Add page number
      ctx.fillStyle = '#000';
      ctx.font = '12px Georgia';
      ctx.textAlign = 'right';
      ctx.fillText('1', 390, 590);

      // Convert canvas to blob
      return new Promise((resolve) => {
        canvas.toBlob(
          async (blob) => {
            if (blob && blob.size > 0) {
              try {
                const imageUrl = await uploadToCloudinary(blob);
                resolve(imageUrl);
              } catch (error) {
                console.error('Error uploading to Cloudinary:', error);
                resolve(null);
              }
            } else {
              console.error('Canvas produced empty blob');
              resolve(null);
            }
          },
          'image/png',
          0.9
        );
      });
    } catch (error) {
      console.error('Error with canvas conversion:', error);
      return null;
    }
  }, [editor]);

  // Update the handleSave function with corrected state update logic
  const handleSave = useCallback(async () => {
    if (!editor) {
      toast.error('Editor not ready');
      return;
    }

    setIsSaving(true);

    try {
      const editorContent = editor.getJSON();
      const textContent = editor.getText();

      // Validation
      if (!isDiaryPath && !selectedDiaryId) {
        toast.error('Please select a diary');
        return;
      }

      if (!textContent.trim()) {
        toast.error('Please add some content');
        return;
      }

      // console.log("Converting content to image...");

      // Try the main method first, fallback to canvas if needed
      let pageImageUrl = await convertToImageAndUpload();

      if (!pageImageUrl) {
        // console.log("Main method failed, trying canvas fallback...");
        pageImageUrl = await convertToImageAndUploadCanvas();
      }

      if (!pageImageUrl) {
        toast.error('Failed to create page preview image');
        return;
      }

      // console.log("Image uploaded successfully:", pageImageUrl);

      // console.log(diaryOptions, selectedDiaryId)

      // Calculate page number more reliably
      let currentPageNumber = 1;
      const selectedDiary = diaryOptions.find(
        (option) => option.id === selectedDiaryId
      );
      currentPageNumber = (selectedDiary?.pages?.length || 0) + 1;
      const requestBody: RequestBody = {
        content: JSON.stringify(editorContent),
        pageImageUrl: pageImageUrl,
        diaryId: selectedDiaryId,
        pageNumber: currentPageNumber,
        isPublic:
          diaryOptions.find((option) => option.id === selectedDiaryId)
            ?.types !== 'SPECIAL',
      };

      const endpoint = '/api/v1/page/';
      // console.log("Saving to endpoint:", endpoint, "with body:", requestBody);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      // console.log("Content saved:", result);

      // Update diary options state to reflect the new page
      setDiaryOptions((prev) =>
        prev.map((diary) =>
          diary.id === selectedDiaryId
            ? {
                ...diary,
                pages: Array.isArray(diary.pages)
                  ? [...diary.pages, result]
                  : [result],
              }
            : diary
        )
      );

      toast.success('Page saved successfully!');

      // Clear editor content after successful save
      editor.commands.clearContent();
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save page');
    } finally {
      setIsSaving(false);
    }
  }, [
    editor,
    selectedDiaryId,
    isDiaryPath,
    diaryOptions,
    convertToImageAndUpload,
    convertToImageAndUploadCanvas,
  ]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Invalid image type');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pageMiscellaneous');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      const imageUrl = data.secure_url;
      // const imageUrl = data.secure_url.replace("/upload", "/upload/c_fill,h_40");

      editor?.chain().focus().setImage({ src: imageUrl }).run();
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  const addImageUrl = async () => {
    const url = window.prompt('Enter image URL');
    if (!url) return;

    try {
      new URL(url); // Validate URL
      editor?.chain().focus().setImage({ src: url }).run();
      toast.success('Image added successfully');
    } catch {
      toast.error('Please enter a valid URL');
    }
  };

  if (!editor)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading editor...</span>
      </div>
    );

  return (
    <div className={`w-full border rounded-lg ${className}`}>
      {/* Diary Selection - Only show if not in diary path */}
      {!isDiaryPath && (
        <div className="p-4 border-b bg-muted/20">
          <label
            htmlFor="diary-select"
            className="block text-sm font-medium mb-2"
          >
            Select Diary
          </label>
          <Select
            value={selectedDiaryId}
            onValueChange={setSelectedDiaryId}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  isLoading ? 'Loading diaries...' : 'Select a diary'
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available Diaries</SelectLabel>
                {diaryOptions.map((diary) => (
                  <SelectItem key={diary.id} value={diary.id}>
                    {diary.title}
                  </SelectItem>
                ))}
                {diaryOptions.length === 0 && !isLoading && (
                  <SelectItem value="" disabled>
                    No diaries found
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Toolbar */}
      <div className="border-b bg-muted/30 p-2 flex flex-wrap items-center gap-1">
        <Button
          variant={editor.isActive('bold') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive('italic') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive('underline') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline"
          className="h-8 w-8 p-0"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Button
          variant={
            editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'
          }
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="h-8 px-2 text-xs font-mono"
        >
          H1
        </Button>
        <Button
          variant={
            editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'
          }
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="h-8 px-2 text-xs font-mono"
        >
          H2
        </Button>
        <Button
          variant={
            editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'
          }
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="h-8 px-2 text-xs font-mono"
        >
          H3
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Button
          variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Ordered List"
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Button
          variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          title="Align Left"
          className="h-8 w-8 p-0"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant={
            editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'
          }
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          title="Align Center"
          className="h-8 w-8 p-0"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant={
            editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'
          }
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          title="Align Right"
          className="h-8 w-8 p-0"
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Button
          variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Quote"
          className="h-8 w-8 p-0"
        >
          <Quote className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          title="Upload Image"
          className="h-8 w-8 p-0"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={addImageUrl}
          title="Insert image by URL"
          className="h-8 px-2 text-xs"
        >
          <Type className="h-3 w-3 mr-1" />
          URL
        </Button>

        {/* Save Button */}
        <Separator orientation="vertical" className="h-6 mx-1" />
        <Button
          onClick={handleSave}
          size="sm"
          disabled={isSaving}
          className="ml-auto"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save
            </>
          )}
        </Button>
      </div>

      {/* Hidden input for image upload */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      {/* Hidden preview div */}
      <div ref={previewRef} style={{ display: 'none' }} />

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="editor-content min-h-[300px] p-4 focus-within:bg-accent/10 transition-colors"
      />

      {/* Footer */}
      <div className="border-t bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
        <div className="flex justify-between items-center">
          <span>
            {editor.storage.characterCount?.words() || 0} words ·{' '}
            {editor.storage.characterCount?.characters() || 0} characters
          </span>
          <span className="hidden sm:inline">
            Tip: Use **bold**, *italic*, # headings, - lists
          </span>
        </div>
      </div>
    </div>
  );
};

export default TiptapEditor;
