'use client';

import React from 'react';
import { authClient } from '@/lib/auth-client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  Home,
  Search,
  BookOpen,
  PlusCircle,
  CircleUser,
  Users,
  UserStar,
  Github,
  LetterText,
  Linkedin,
  Twitter,
  Mail,
} from 'lucide-react';
import { ModeToggle } from './toogle-theme';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Notes',
    url: '/notes',
    icon: PlusCircle,
  },
  {
    title: 'My Diary',
    url: '/diary',
    icon: BookOpen,
  },
  {
    title: 'Explore',
    url: '/explore',
    icon: Search,
  },
  {
    title: 'Connections',
    url: '/connections',
    icon: Users,
  },
  // {
  //   title: "Analytics",
  //   url: "/analytics",
  //   icon: ChartArea,
  // },
  //   {
  //     title: "Favorites",
  //     url: "#",
  //     icon: Star,
  //   },
  {
    title: 'Profile',
    url: '/profile',
    icon: CircleUser,
  },
];

const secondaryItems = [
  {
    title: 'Aman Kushwaha',
    url: '/profile/amank-root',
    icon: UserStar,
    target: '_self',
  },
  {
    title: 'GitHub',
    url: 'https://github.com/amank-root',
    icon: Github,
    target: '_blank',
  },
  {
    title: 'Portfolio',
    url: 'https://amankushwaha.netlify.app/',
    icon: LetterText,
    target: '_blank',
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/amank-root',
    icon: Linkedin,
    target: '_blank',
  },
  {
    title: 'Twitter',
    url: 'https://twitter.com/Amankushwaha_28',
    icon: Twitter,
    target: '_blank',
  },
  {
    title: 'Contact',
    url: 'mailto:contact@amank-root.slmail.me',
    icon: Mail,
    target: '_self',
  },
];

function MainSidebar() {
  const pathname = usePathname();
  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = '/auth/sign-in';
  };

  return (
    <Sidebar className="sticky border-r-2" variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <BookOpen className="h-6 w-6" />
          <Link href="/" className="font-semibold text-lg">
            My Diary
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === pathname}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel>Developer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link target={item.target} href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4">
          <ModeToggle />
        </div>
        <Button className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

export default MainSidebar;
