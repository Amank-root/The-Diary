'use client';

import { useSession, authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, LogOut } from 'lucide-react';

type User = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  username?: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
};

export default function UserProfile() {
  const { data: session, isPending } = useSession();

  // console.log(session);

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = '/auth/sign-in';
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={session.user.image || ''}
              alt={session.user.name || ''}
            />
            <AvatarFallback>
              {session.user.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{session.user.name}</h3>
            <p className="text-sm text-muted-foreground">
              {session.user.email}
            </p>
            {(session.user as User).username && (
              <p className="text-sm text-muted-foreground">
                @{(session.user as User).username}
              </p>
            )}
          </div>
        </div>

        <Button onClick={handleSignOut} variant="outline" className="w-full">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}
