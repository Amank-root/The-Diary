'use client'
import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import '../css/diaryflip.css'

// PageCover Component with proper TypeScript
const PageCover = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(
    ({ children }, ref) => (
        <div className="page page-cover" ref={ref} data-density="hard">
            <div className="page-content">
                <h2 className="text-2xl font-bold text-center mt-20">{children}</h2>
            </div>
        </div>
    )
);
PageCover.displayName = "PageCover";

// Page Component with proper TypeScript
const Page = React.forwardRef<HTMLDivElement, { number: number; content: string }>(
    ({ number, content }, ref) => (
        <div className="page" ref={ref}>
            <div className="page-content p-6">
                <h2 className="page-header text-lg font-semibold mb-4 flex w-full items-center justify-between">Page {number}
                    <span className="flex flex-col text-xs font-light font-serif leading-0.5 gap-2">
                        <span className="">username -</span>
                        <span>title</span>
                    </span>
                </h2>
                <div
                    className="page-text prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
                <div className="page-footer text-center text-sm text-gray-500 mt-4">
                    {number}
                </div>
            </div>
        </div>
    )
);
Page.displayName = "Page";

// Proper TypeScript interface for Tiptap JSON
interface TiptapContent {
    type: string;
    content?: TiptapContent[];
    text?: string;
    attrs?: Record<string, any>;
    marks?: any[];
}

interface DiaryFlipProps {
    tiptapJson?: TiptapContent | TiptapContent[] | null;
    title?: string;
}

const DiaryFlip: React.FC<DiaryFlipProps> = ({ tiptapJson, title = "My Diary" }) => {
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [orientation, setOrientation] = useState("");
    const [bookState, setBookState] = useState("");
    const [pages, setPages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const flipBook = useRef<any>(null);

    // Convert Tiptap JSON to HTML and split into pages
    useEffect(() => {
        const processContent = async () => {
            setIsLoading(true);

            if (!tiptapJson) {
                // Fallback dummy content
                setPages([
                    "<p>Welcome to your diary! This is your first page.</p><p>Start writing your thoughts and memories here.</p>",
                    "<p>This is the second page of your diary.</p><p>You can add more content as you continue writing.</p>",
                ]);
                setIsLoading(false);
                return;
            }

            try {
                // Ensure tiptapJson is in the correct format
                const contentToProcess = Array.isArray(tiptapJson)
                    ? { type: 'doc', content: tiptapJson }
                    : tiptapJson;

                const html = generateHTML(contentToProcess, [StarterKit]);

                // Better content splitting logic
                const splitContentIntoPages = (htmlContent: string): string[] => {
                    // Remove HTML tags for character counting
                    const textContent = htmlContent.replace(/<[^>]*>/g, '');

                    if (textContent.length <= 800) {
                        return [htmlContent];
                    }

                    // Split by paragraphs first
                    const paragraphs = htmlContent.split('</p>');
                    const pages: string[] = [];
                    let currentPage = '';
                    let currentLength = 0;

                    for (const paragraph of paragraphs) {
                        const paragraphText = paragraph.replace(/<[^>]*>/g, '');

                        if (currentLength + paragraphText.length > 800 && currentPage) {
                            // Finish current page
                            pages.push(currentPage + (currentPage.includes('<p>') ? '</p>' : ''));
                            currentPage = paragraph + '</p>';
                            currentLength = paragraphText.length;
                        } else {
                            currentPage += paragraph + '</p>';
                            currentLength += paragraphText.length;
                        }
                    }

                    if (currentPage.trim()) {
                        pages.push(currentPage);
                    }

                    return pages.length > 0 ? pages : [htmlContent];
                };

                const splitPages = splitContentIntoPages(html);
                setPages(splitPages);
            } catch (error) {
                console.error("Error parsing Tiptap JSON:", error);
                setPages(["<p>Error loading content. Please try again.</p>"]);
            } finally {
                setIsLoading(false);
            }
        };

        processContent();
    }, [tiptapJson]);

    // Set total page count when flipBook is mounted and pages are loaded
    useEffect(() => {
        if (flipBook.current && pages.length > 0 && !isLoading) {
            // Add a small delay to ensure the flip book is fully rendered
            const timer = setTimeout(() => {
                try {
                    const pageFlip = flipBook.current?.getPageFlip();
                    if (pageFlip) {
                        const pageCount = pageFlip.getPageCount();
                        setTotalPage(pageCount);
                    }
                } catch (error) {
                    console.error("Error getting page count:", error);
                    setTotalPage(pages.length + 2); // pages + 2 covers
                }
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [pages, isLoading]);

    const nextButtonClick = () => {
        try {
            flipBook.current?.getPageFlip()?.flipNext();
        } catch (error) {
            console.error("Error flipping to next page:", error);
        }
    };

    const prevButtonClick = () => {
        try {
            flipBook.current?.getPageFlip()?.flipPrev();
        } catch (error) {
            console.error("Error flipping to previous page:", error);
        }
    };

    const onPage = (e: { data: number }) => setPage(e.data);
    const onChangeOrientation = (e: { data: string }) => setOrientation(e.data);
    const onChangeState = (e: { data: string }) => setBookState(e.data);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p>Loading your diary...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="diary-flip-container">
            {/* <style jsx>{`
        .demo-book {
          margin: 0 auto;
        }
        
        .page {
          background: white;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .page-cover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .page-content {
          padding: 20px;
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }
        
        .page-text {
          line-height: 1.6;
          font-size: 14px;
        }
        
        .page-footer {
          position: absolute;
          bottom: 20px;
          right: 20px;
        }
        
        .page-header {
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }
      `}</style> */}

            <div className="mb-6">
                <HTMLFlipBook
                    width={550}
                    height={733}
                    size="stretch"
                    minWidth={315}
                    minHeight={400}
                    maxHeight={1533}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    onFlip={onPage}
                    onChangeOrientation={onChangeOrientation}
                    onChangeState={onChangeState}
                    className="demo-book"
                    ref={flipBook}
                >
                    <PageCover>{title}</PageCover>

                    {pages.map((htmlContent, index) => (
                        <Page key={index} number={index + 1} content={htmlContent} />
                    ))}

                    <PageCover>THE END</PageCover>
                </HTMLFlipBook>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={prevButtonClick}
                    disabled={page <= 0}
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                </Button>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Page</span>
                    <span className="font-semibold">{page + 1}</span>
                    <span>of</span>
                    <span className="font-semibold">{totalPage}</span>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={nextButtonClick}
                    disabled={page >= totalPage - 1}
                >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </div>

            {/* Debug info - only in development */}
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 text-xs text-gray-500 text-center">
                    State: <i>{bookState}</i> | Orientation: <i>{orientation}</i> | Pages: {pages.length}
                </div>
            )}
        </div>
    );
};

export default DiaryFlip;
