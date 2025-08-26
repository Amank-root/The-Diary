import React from 'react'
import { CardContent, CardHeader, CardTitle, Card } from '@/components/ui/card'

interface SmallCardsProps {
  title: string
  icon?: React.ReactNode
  mainContent: string
  subContent?: string
}

function SmallCards({title, icon, mainContent, subContent} : SmallCardsProps) {
  return (
    <>
        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mainContent}</div>
            <p className="text-xs text-muted-foreground">
              {subContent}
            </p>
          </CardContent>
        </Card>
    </>
  )
}

export default SmallCards

















// const handleSave = useCallback(async () => {
//   if (!editor) {
//     toast.error("Editor not ready");
//     return;
//   }

//   setIsSaving(true);

//   try {
//     const editorContent = editor.getJSON();
//     const textContent = editor.getText();

//     console.log("Editor JSON:", editorContent);
//     console.log("Editor HTML:", editor.getHTML());
//     console.log("Editor Text:", textContent);

//     // Validation
//     if (!isDiaryPath && !selectedDiaryId) {
//       toast.error("Please select a diary");
//       return;
//     }

//     if (!textContent.trim()) {
//       toast.error("Please add some content");
//       return;
//     }

//     console.log("Converting content to image...");
//     toast.loading("Creating page preview...");

//     // Try the main method first, fallback to canvas if needed
//     let pageImageUrl = await convertToImageAndUpload();
    
//     // if (!pageImageUrl) {
//     //   console.log("Main method failed, trying canvas fallback...");
//     //   pageImageUrl = await convertToImageAndUploadCanvas();
//     // }
    
//     if (!pageImageUrl) {
//       toast.error("Failed to create page preview image");
//       return;
//     }

//     console.log("Image uploaded successfully:", pageImageUrl);

//     const requestBody: any = {
//       content: JSON.stringify(editorContent),
//       pageImageUrl: pageImageUrl,
//     };

//     if (!isDiaryPath && selectedDiaryId) {
//       requestBody.diaryId = selectedDiaryId;
//     }

//     const endpoint = isDiaryPath ? "/api/v1/diary/" : "/api/v1/page/";

//     const response = await fetch(endpoint, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Server error: ${response.statusText} - ${errorText}`);
//     }

//     const result = await response.json();
//     console.log("Content saved:", result);

//     toast.dismiss();
//     toast.success("Page saved successfully!");

//   } catch (error) {
//     console.error("Error saving:", error);
//     toast.dismiss();
//     toast.error("Failed to save page");
//   } finally {
//     setIsSaving(false);
//   }
// }, [editor, selectedDiaryId, isDiaryPath]);
  








// ------------------------







// const convertToImageAndUpload = async (): Promise<string | null> => {

//   if (!editor) {
//     console.error("Editor not available");
//     return null;
//   }

//   try {
//     // Get the HTML content from editor
//     const htmlContent = editor.getHTML();
//     console.log("HTML Content to convert:", htmlContent);
    
//     if (!htmlContent || htmlContent.trim() === '<p></p>' || htmlContent.trim() === '') {
//       console.error("No content to convert");
//       toast.error("No content to convert to image");
//       return null;
//     }

//     // Create the exact container structure you provided
//     const pageDiv = document.createElement('div');
//     pageDiv.className = 'page';
//     pageDiv.style.cssText = `
//       position: fixed;
//       top: 0;
//       left: 0;
//       width: 400px;
//       height: 600px;
//       z-index: 9999;
//       opacity: 1;
//       visibility: visible;
//     `;

//     // Create page-content div with minimal padding
//     const pageContentDiv = document.createElement('div');
//     pageContentDiv.className = 'page-content';
//     pageContentDiv.style.cssText = `
//       padding: 6px;
//       height: 100%;
//       box-sizing: border-box;
//       overflow: hidden;
//     `;

//     // Create page header with just date (minimal spacing)
//     const pageHeaderDiv = document.createElement('h2');
//     pageHeaderDiv.className = 'page-header';
//     pageHeaderDiv.style.cssText = `
//       font-size: 12px;
//       font-weight: 600;
//       margin: 0 0 4px 0;
//       display: flex;
//       width: 100%;
//       align-items: center;
//       justify-content: center;
//       border-bottom: 1px solid #e5e7eb;
//       padding-bottom: 2px;
//       font-family: Georgia, serif;
//       color: #333;
//     `;

//     // Get current date (shorter format)
//     const currentDate = new Date().toLocaleDateString('en-US', { 
//       month: 'short', 
//       day: 'numeric',
//       year: 'numeric'
//     });

//     pageHeaderDiv.textContent = currentDate;

//     // Create page text div with content (maximum height and minimal spacing)
//     const pageTextDiv = document.createElement('div');
//     pageTextDiv.className = 'page-text prose prose-sm max-w-none';
//     pageTextDiv.style.cssText = `
//       line-height: 1.1;
//       font-size: 10px;
//       font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
//       color: #333;
//       max-width: none;
//       height: calc(100% - 40px);
//       overflow: hidden;
//       margin: 0;
//       padding: 0;
//     `;

//     // Clean and style the HTML content with minimal spacing
//     let styledContent = htmlContent;
    
//     // Remove conflicting styles
//     styledContent = styledContent.replace(/style="[^"]*"/g, '');
    
//     // Apply ultra-compact styling for maximum content
//     styledContent = styledContent
//       .replace(/<p>/g, '<p style="margin: 0 0 2px 0; color: #333; font-family: inherit; font-size: 10px; line-height: 1.1;">')
//       .replace(/<h1>/g, '<h1 style="font-size: 12px; margin: 0 0 3px 0; color: #333; font-family: inherit; font-weight: bold;">')
//       .replace(/<h2>/g, '<h2 style="font-size: 11px; margin: 0 0 3px 0; color: #333; font-family: inherit; font-weight: bold;">')
//       .replace(/<h3>/g, '<h3 style="font-size: 10px; margin: 0 0 2px 0; color: #333; font-family: inherit; font-weight: bold;">')
//       .replace(/<blockquote>/g, '<blockquote style="margin: 2px 0; padding: 1px 4px; border-left: 1px solid #ccc; background: #f9f9f9; font-style: italic; color: #333; font-family: inherit;">')
//       .replace(/<ul>/g, '<ul style="margin: 2px 0; padding-left: 8px; color: #333; font-family: inherit;">')
//       .replace(/<ol>/g, '<ol style="margin: 2px 0; padding-left: 8px; color: #333; font-family: inherit;">')
//       .replace(/<li>/g, '<li style="margin: 0; color: #333; font-family: inherit;">')
//       .replace(/<strong>/g, '<strong style="color: #333; font-family: inherit; font-weight: bold;">')
//       .replace(/<em>/g, '<em style="color: #333; font-family: inherit; font-style: italic;">')
//       .replace(/<br>/g, '<br>')
//       .replace(/&nbsp;/g, ' ');

//     pageTextDiv.innerHTML = styledContent;

//     // Create page footer with page number (black color)
//     const pageFooterDiv = document.createElement('div');
//     pageFooterDiv.className = 'page-footer';
//     pageFooterDiv.style.cssText = `
//       position: absolute;
//       bottom: 4px;
//       right: 6px;
//       text-align: center;
//       font-size: 12px;
//       color: #000;
//       margin: 0;
//       font-family: Georgia, serif;
//     `;
//     pageFooterDiv.textContent = '1'; // Page number

//     // Assemble the structure
//     pageContentDiv.appendChild(pageHeaderDiv);
//     pageContentDiv.appendChild(pageTextDiv);
//     pageContentDiv.appendChild(pageFooterDiv);
//     pageDiv.appendChild(pageContentDiv);

//     // Append to body temporarily
//     document.body.appendChild(pageDiv);
    
//     // Force reflow
//     pageDiv.offsetHeight;

//     // Wait for styles to load
//     await new Promise(resolve => setTimeout(resolve, 200));

//     console.log("About to convert element:", pageDiv);
//     console.log("Element dimensions:", pageDiv.offsetWidth, pageDiv.offsetHeight);

//     // Convert to PNG using html-to-image with high quality settings for sharp image
//     const dataUrl = await htmlToImage.toPng(pageDiv, {
//       width: 400,
//       height: 600,
//       quality: 1.0, // Maximum quality
//       backgroundColor: '#fdfaf4',
//       pixelRatio: 3, // Higher pixel ratio for sharp image
//       cacheBust: true,
//       imagePlaceholder: undefined,
//       skipAutoScale: true,
//       style: {
//         transform: 'scale(1)',
//         transformOrigin: 'top left',
//         imageRendering: 'crisp-edges', // Sharp image rendering
//         WebkitFontSmoothing: 'antialiased',
//         fontSmooth: 'always',
//       }
//     });

//     console.log("Conversion completed, dataUrl length:", dataUrl.length);

//     // Remove temporary div
//     document.body.removeChild(pageDiv);

//     if (!dataUrl || dataUrl === 'data:,') {
//       throw new Error("Failed to generate image - empty dataUrl");
//     }

//     // Convert dataUrl to blob
//     const response = await fetch(dataUrl);
//     const blob = await response.blob();

//     console.log("Blob size:", blob.size);

//     if (blob.size === 0) {
//       throw new Error("Generated image is empty");
//     }

//     // Upload to Cloudinary
//     const imageUrl = await uploadToCloudinary(blob);
//     console.log("Uploaded to Cloudinary:", imageUrl);
    
//     return imageUrl;

//   } catch (error) {
//     console.error("Error converting to image:", error);
//     return null;
//   }
// };