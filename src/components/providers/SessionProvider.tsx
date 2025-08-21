"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
// import AuthDebug from "@/components/debug/AuthDebug";
import { Loader2 } from "lucide-react";



interface SessionProviderProps {
    children: React.ReactNode;
}

export default function SessionProvider({ children }: SessionProviderProps) {
    const { data: session, isPending } = useSession();
    const pathname = usePathname();
    console.log("SessionProvider - Session:", session, "isPending:", isPending);
    const router = useRouter();
    const [initialLoad, setInitialLoad] = useState(true);

    console.log("Home page - Session:", session, "isPending:", isPending);

    useEffect(() => {
        // Give a small delay on initial load to allow session to be established
        if (initialLoad) {
            const timer = setTimeout(() => {
                setInitialLoad(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [initialLoad]);

    useEffect(() => {
        if (!initialLoad && !isPending && !session && pathname !== "/auth/sign-in" && pathname !== "/auth/sign-up") {
            console.log("No session found, redirecting to sign-in");
            router.push("/auth/sign-in");
        }
    }, [session, isPending, router, initialLoad]);

    if (isPending || initialLoad) {
        console.log("Session is pending or initial load, showing loader");
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
            </div>
        );
    }

    // if (!session) {
    //   console.log("No session, returning debug info");
    //   return (
    //     <div className="min-h-screen flex items-center justify-center">
    //       <AuthDebug />
    //     </div>
    //   );
    // }


    return <>{children}</>;
}