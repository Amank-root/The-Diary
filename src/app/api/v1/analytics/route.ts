import { authSessionServer, prisma } from "@/lib/auth";

export async function GET() {
  const userData = await authSessionServer();
  
  if (!userData?.session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const userId = userData.user.id;

  try {
    // Get total entries (pages)
    const totalEntries = await prisma.page.count({
      where: {
        diary: {
          userId: userId
        }
      }
    });

    // Get entries from last week for comparison
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const entriesLastWeek = await prisma.page.count({
      where: {
        diary: {
          userId: userId
        },
        createdAt: {
          lt: oneWeekAgo
        }
      }
    });

    const entriesThisWeek = totalEntries - entriesLastWeek;

    // Calculate writing streak (consecutive days with entries)
    const recentPages = await prisma.page.findMany({
      where: {
        diary: {
          userId: userId
        }
      },
      select: {
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 30 // Get last 30 entries to calculate streak
    });

    let writingStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const datesWithEntries = new Set();
    recentPages.forEach(page => {
      const pageDate = new Date(page.createdAt);
      pageDate.setHours(0, 0, 0, 0);
      datesWithEntries.add(pageDate.getTime());
    });

    // Calculate consecutive days
    const currentDate = new Date(today);
    while (datesWithEntries.has(currentDate.getTime())) {
      writingStreak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    // Get recent entries for display
    const recentEntries = await prisma.page.findMany({
      where: {
        diary: {
          userId: userId
        }
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        diary: {
          select: {
            title: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 3
    });

    // Process recent entries to extract preview text
    const processedEntries = recentEntries.map(entry => {
      let preview = "No content available";
      let title = `Entry from ${entry.diary.title}`;
      
      try {
        if (entry.content) {
          const contentObj = JSON.parse(entry.content);
          if (contentObj.content && Array.isArray(contentObj.content)) {
            // Extract text from TipTap content structure
            let extractedText = "";
            const extractText = (node: unknown) => {
              const nodeObj = node as { type?: string; text?: string; content?: unknown[] };
              if (nodeObj.type === 'text') {
                extractedText += nodeObj.text || '';
              } else if (nodeObj.content && Array.isArray(nodeObj.content)) {
                nodeObj.content.forEach(extractText);
              }
            };
            contentObj.content.forEach(extractText);
            preview = extractedText.substring(0, 100) + "...";
            
            // Try to get title from first heading or first line
            if (extractedText.length > 0) {
              const firstLine = extractedText.split('\n')[0];
              if (firstLine.length > 0 && firstLine.length < 50) {
                title = firstLine;
              }
            }
          }
        }
      } catch {
        // Fallback for non-JSON content
        if (typeof entry.content === 'string') {
          preview = entry.content.substring(0, 100) + "...";
        }
      }

      return {
        id: entry.id,
        title,
        preview,
        date: entry.createdAt.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        mood: "Thoughtful", // Default mood, could be enhanced with mood analysis
        tags: ["personal", "diary"] // Default tags, could be enhanced with tag extraction
      };
    });

    const analytics = {
      totalEntries,
      entriesThisWeek,
      writingStreak,
      recentEntries: processedEntries
    };

    return new Response(JSON.stringify(analytics), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error fetching analytics:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch analytics" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}