// "use client";

// import { useSession } from "@/lib/auth-client";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useEffect, useState } from "react";

// export default function AuthDebug() {
//   const { data: session, isPending, error } = useSession();
//   const [cookies, setCookies] = useState<string>("");

//   useEffect(() => {
//     // Check what cookies are available
//     setCookies(document.cookie);
//   }, []);

//   const testSession = async () => {
//     try {
//       const response = await fetch("/api/auth/get-session", {
//         credentials: "include",
//       });
//       const data = await response.json();
//       // console.log("Direct session fetch result:", data);
//     } catch (err) {
//       console.error("Session fetch error:", err);
//     }
//   };

//   return (
//     <Card className="max-w-2xl mx-auto mt-8">
//       <CardHeader>
//         <CardTitle>Auth Debug Info</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div>
//           <strong>isPending:</strong> {isPending ? "true" : "false"}
//         </div>
//         <div>
//           <strong>session:</strong> {session ? "exists" : "null"}
//         </div>
//         <div>
//           <strong>error:</strong> {error ? JSON.stringify(error) : "none"}
//         </div>
//         <div>
//           <strong>cookies:</strong>
//           <pre className="text-xs bg-gray-100 p-2 rounded mt-1">
//             {cookies || "no cookies"}
//           </pre>
//         </div>
//         {session && (
//           <div>
//             <strong>session data:</strong>
//             <pre className="text-xs bg-gray-100 p-2 rounded">
//               {JSON.stringify(session, null, 2)}
//             </pre>
//           </div>
//         )}
//         <div className="flex gap-2">
//           <Button onClick={testSession}>
//             Test Session Fetch
//           </Button>
//           <Button
//             onClick={() => {
//               window.location.reload();
//             }}
//           >
//             Refresh Page
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
