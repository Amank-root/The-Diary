// connections/page.tsx
import React from 'react'
import ReactFlowUserConnection from './ReactFlowUserConnection'
import { authSessionServer } from '@/lib/auth';
import { getProfile } from '@/lib/actions/profile';
import { getConnections } from '@/lib/actions/connections';

async function Connections() {
  const session = await authSessionServer();
  const data = await getConnections();

  // Convert single user data to include connected users
  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <div className='w-full h-full '>
      {/* @ts-ignore */}
      <ReactFlowUserConnection data={data} />
    </div>
  )
}

export default Connections
