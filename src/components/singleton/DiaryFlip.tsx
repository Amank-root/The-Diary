'use client'
import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from '@tiptap/extension-image'; // Add this import
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import '../css/diaryflip.css'

// PageCover Component with proper TypeScript
// Updated PageCover Component with cover image support
const PageCover = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{
    coverImage?: string;
    isBackCover?: boolean
}>>(
    ({ children, coverImage, isBackCover = false }, ref) => (
        <div className="page page-cover" ref={ref} data-density="hard">
            <div className="page-content relative overflow-hidden">
                {/* Background image if provided */}
                {coverImage && !isBackCover && (
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${coverImage})` }}
                    >
                        {/* Overlay for better text readability */}
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                    {coverImage && !isBackCover ? (
                        // Front cover with image
                        <div className="text-center text-white drop-shadow-lg">
                            <h1 className="text-4xl font-bold mb-4 text-shadow-lg">{children}</h1>
                            <div className="w-16 h-1 bg-white mx-auto opacity-80"></div>
                        </div>
                    ) : (
                        // Back cover or fallback without image
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-center mt-20">{children}</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
);
PageCover.displayName = "PageCover";
// const PageCover = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(
//     ({ children }, ref) => (
//         <div className="page page-cover" ref={ref} data-density="hard">
//             <div className="page-content">
//                 <h2 className="text-2xl font-bold text-center mt-20">{children}</h2>
//             </div>
//         </div>
//     )
// );
// PageCover.displayName = "PageCover";

// Page Component with date instead of "Page X"
const Page = React.forwardRef<HTMLDivElement, { number: number; content: string; date?: Date }>(
    ({ number, content, date }, ref) => (
        <div className="page dark:text-accent" ref={ref}>
            <div className="page-content p-6">
                <h2 className="page-header text-lg font-semibold mb-4 flex w-full items-center justify-between">
                    {date ? new Date(date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    }) : `Page ${number}`}
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attrs?: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    marks?: any[];
}

interface DiaryFlipProps {
    diary?: {
        id: string;
        title: string;
        diaryCoverImage?: string;
        createdAt: Date;
        updatedAt: Date;
        pages: {
            id: string;
            content: string; // This is a JSON string, not an object
            pageNumber: number;
            pageImageUrl?: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    };
    title?: string;
}

const extensions = [
    StarterKit.configure({
        heading: { levels: [1, 2, 3] }
    }),
    Underline,
    TextAlign.configure({
        types: ['heading', 'paragraph']
    }),
    Image.configure({
        inline: false,
        HTMLAttributes: {
            class: 'max-w-full h-[200px] max-h-[300px] rounded-lg my-4',
        },
    }),
    Typography,
];


const DiaryFlip: React.FC<DiaryFlipProps> = ({ diary, title }) => {
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [orientation, setOrientation] = useState("");
    const [bookState, setBookState] = useState("");
    const [pages, setPages] = useState<{ content: string; date: Date; pageNumber: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flipBook = useRef<any>(null);

    // Define the extensions that match your editor


    // Process diary pages
    useEffect(() => {
        const processContent = async () => {
            setIsLoading(true);

            if (!diary || !diary.pages || diary.pages.length === 0) {
                // Fallback dummy content
                setPages([
                    {
                        content: "<p>Welcome to your diary! This is your first page.</p><p>Start writing your thoughts and memories here.</p>",
                        date: new Date(),
                        pageNumber: 1
                    }
                ]);
                setIsLoading(false);
                return;
            }

            try {
                const processedPages = diary.pages.map((diaryPage, index) => {
                    try {
                        // Parse the JSON string content
                        const parsedContent = JSON.parse(diaryPage.content) as TiptapContent;

                        // Generate HTML from Tiptap JSON with all extensions
                        const html = generateHTML(parsedContent, extensions);

                        return {
                            content: html,
                            date: diaryPage.createdAt,
                            pageNumber: diaryPage.pageNumber || index + 1
                        };
                    } catch (error) {
                        console.error(`Error parsing page ${index + 1} content:`, error);
                        console.error('Content that failed to parse:', diaryPage.content);

                        // Try to extract plain text as fallback
                        let fallbackContent = "<p>Error loading this page content.</p>";
                        try {
                            const parsedContent = JSON.parse(diaryPage.content);
                            if (parsedContent?.content) {
                                // Extract text content from Tiptap structure
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const extractText = (node: any): string => {
                                    if (node.text) return node.text;
                                    if (node.content) {
                                        return node.content.map(extractText).join('');
                                    }
                                    return '';
                                };
                                const text = parsedContent.content.map(extractText).join(' ');
                                if (text.trim()) {
                                    fallbackContent = `<p>${text}</p>`;
                                }
                            }
                        } catch (fallbackError) {
                            console.error('Fallback extraction also failed:', fallbackError);
                        }

                        return {
                            content: fallbackContent,
                            date: diaryPage.createdAt,
                            pageNumber: diaryPage.pageNumber || index + 1
                        };
                    }
                });

                // Sort pages by page number
                processedPages.sort((a, b) => a.pageNumber - b.pageNumber);

                setPages(processedPages);
            } catch (error) {
                console.error("Error processing diary pages:", error);
                setPages([
                    {
                        content: "<p>Error loading diary content. Please try again.</p>",
                        date: new Date(),
                        pageNumber: 1
                    }
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        processContent();
    }, [diary]);

    // Set total page count when flipBook is mounted and pages are loaded
    useEffect(() => {
        if (flipBook.current && pages.length > 0 && !isLoading) {
            // Add a small delay to ensure the flip book is fully rendered
            const timer = setTimeout(() => {
                try {
                    // The correct way to access HTMLFlipBook methods
                    if (flipBook.current && typeof flipBook.current.getPageFlip === 'function') {
                        const pageFlipInstance = flipBook.current.getPageFlip();
                        if (pageFlipInstance && typeof pageFlipInstance.getPageCount === 'function') {
                            const pageCount = pageFlipInstance.getPageCount();
                            setTotalPage(pageCount);
                            // console.log("Total pages from flipbook:", pageCount);
                        } else {
                            // Fallback: calculate total pages manually
                            const totalPages = pages.length + 2;
                            setTotalPage(totalPages);
                            // console.log("Using fallback page count:", totalPages);
                        }
                    } else {
                        // Fallback: calculate total pages manually
                        const totalPages = pages.length + 2;
                        setTotalPage(totalPages);
                        // console.log("Using fallback page count (no getPageFlip):", totalPages);
                    }
                } catch (error) {
                    console.error("Error getting page count:", error);
                    // Fallback calculation
                    const totalPages = pages.length + 2;
                    setTotalPage(totalPages);
                }
            }, 1000); // Increased delay for better initialization

            return () => clearTimeout(timer);
        }
    }, [pages, isLoading]);

    // const nextButtonClick = () => {
    //     try {
    //         if (flipBook.current && typeof flipBook.current.getPageFlip === 'function') {
    //             const pageFlipInstance = flipBook.current.getPageFlip();
    //             if (pageFlipInstance && typeof pageFlipInstance.flipNext === 'function') {
    //                 pageFlipInstance.flipNext();
    //             } else {
    //                 // console.warn("flipNext method not available");
    //             }
    //         } else {
    //             // console.warn("FlipBook not properly initialized");
    //         }
    //     } catch (error) {
    //         console.error("Error flipping to next page:", error);
    //     }
    // };

    // const prevButtonClick = () => {
    //     try {
    //         if (flipBook.current && typeof flipBook.current.getPageFlip === 'function') {
    //             const pageFlipInstance = flipBook.current.getPageFlip();
    //             if (pageFlipInstance && typeof pageFlipInstance.flipPrev === 'function') {
    //                 pageFlipInstance.flipPrev();
    //             } else {
    //                 // console.warn("flipPrev method not available");
    //             }
    //         } else {
    //             // console.warn("FlipBook not properly initialized");
    //         }
    //     } catch (error) {
    //         console.error("Error flipping to previous page:", error);
    //     }
    // };

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

    const diaryTitle = title || diary?.title || "My Diary";

    return (
        <div className="diary-flip-container">
            <div className="mb-6">
                {/* @ts-expect-error: i dont know */}
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
                    {/* Front cover with diary cover image */}
                    <PageCover coverImage={diary?.diaryCoverImage}>
                        {diaryTitle}
                    </PageCover>

                    {pages.map((pageData, index) => (
                        <Page
                            key={`page-${pageData.pageNumber}-${index}`}
                            number={pageData.pageNumber}
                            content={pageData.content}
                            date={pageData.date}
                        />
                    ))}

                    {/* Back cover without image */}
                    <PageCover isBackCover={true}>
                        THE END
                    </PageCover>
                </HTMLFlipBook>
                {/* <HTMLFlipBook
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
                    <PageCover coverImage={diary?.diaryCoverImage}>
                        {diaryTitle}
                    </PageCover>

                    {pages.map((pageData, index) => (
                        <Page
                            key={`page-${pageData.pageNumber}-${index}`}
                            number={pageData.pageNumber}
                            content={pageData.content}
                            date={pageData.date}
                        />
                    ))}

                    <PageCover>THE END</PageCover>
                </HTMLFlipBook> */}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-4">
                {/* <Button
                    variant="outline"
                    size="sm"
                    onClick={prevButtonClick}
                    disabled={page <= 0}
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                </Button> */}

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Page</span>
                    <span className="font-semibold">{page + 1}</span>
                    <span>of</span>
                    <span className="font-semibold">{totalPage}</span>
                </div>

                {/* <Button
                    variant="outline"
                    size="sm"
                    onClick={nextButtonClick}
                    disabled={page >= totalPage - 1}
                >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Button> */}
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