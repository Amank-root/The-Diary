import { authSessionServer, prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const userData = await authSessionServer();
  const body = await request.json();
  const extractedContent = {
    text: body.text || "",
    color: body.color || "",
    position: body.position || { x: 0, y: 0 },
  };

  try {
    const newNote = await prisma.note.upsert({
      where: { id: body.id || "", userId: userData?.user?.id || "" },
      update: {
        ...extractedContent,
        title: userData?.user?.username || "Untitled",
      },
      create: {
        ...extractedContent,
        title: userData?.user?.username || "Untitled",
        userId: userData?.user?.id || "",
      },
      select:{
        id: true,
        text: true,
        color: true,
        position: true,
      }
    });
    revalidatePath("/notes"); // Revalidate the homepage or any other path as needed
    return new Response(JSON.stringify(newNote), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating note:", error);
    return new Response(JSON.stringify({ error: "Failed to create note" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request: Request) {
  const userData = await authSessionServer();
  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get("id");

  if (!noteId) {
    return new Response(JSON.stringify({ error: "Note ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await prisma.note.delete({
      where: { id: noteId, userId: userData?.user?.id },
    });
    revalidatePath("/notes"); // Revalidate the homepage or any other path as needed
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting note:", error);
    return new Response(JSON.stringify({ error: "Failed to delete note" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  
}