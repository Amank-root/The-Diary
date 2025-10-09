import React from 'react';
import Navbar from './Navbar';

// const revalidate = 0; // Disable caching to always fetch the latest data

async function Layout({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center border-t border-border mb-8">
      <Navbar id={id} />
      <div className="w-full">
        <div className="max-w-4xl mx-auto py-2">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
