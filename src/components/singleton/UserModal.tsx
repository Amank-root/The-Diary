"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
// import { AvatarImage,  } from "@radix-ui/react-avatar";

// interface 
type Readers = {
    // id: string;
    createdAt: Date;
    reader: {
        // id: string;
        username: string;
        name: string;
        image: string;
    };
}[]

type Reading = {
    // id: string;
    createdAt: Date;
    reading: {
        // id: string;
        username: string;
        name: string;
        image: string;
    };
}[]

export default function UserModal({ data, type }: { data: Readers | Reading | [], type: "reader" | "reading" }) {
    if (data?.length === 0) {
        return (
            <div className="text-center">
                <div className="font-semibold">{data?.length}</div>
                <div className="text-sm text-muted-foreground">{type === "reader" ? "Readers" : "Reading"}</div>
            </div>
        )
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="text-center">
                    <div className="font-semibold">{data?.length}</div>
                    <div className="text-sm text-muted-foreground">{type === "reader" ? "Readers" : "Reading"}</div>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{type === "reader" ? "Readers" : "Reading"} List</DialogTitle>
                </DialogHeader>

                {/* Scrollable Area */}
                <ScrollArea className="h-60 rounded-md border p-4">
                    <ul className="space-y-2">
                        {type === "reader" && (data as Readers).map((item) => (
                            <Link key={item.reader.username + item.createdAt} className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer flex gap-2 items-center" href={`/profile/${item.reader.username}`}>
                                <Avatar>
                                    <AvatarImage
                                        src={item.reader.image}
                                        alt={item.reader.name}
                                    />
                                    <AvatarFallback>{item.reader.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{item.reader.name}</span>
                            </Link>
                        ))}
                        {type === "reading" && (data as Reading).map((item) => (
                            <Link key={item.reading.username + item.createdAt} className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center gap-2" href={`/profile/${item.reading.username}`}>
                                <Avatar>
                                    <AvatarImage
                                        src={item.reading.image}
                                        alt={item.reading.name}
                                    />
                                    <AvatarFallback>{item.reading.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {item.reading.name}
                            </Link>
                        ))}
                    </ul>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
