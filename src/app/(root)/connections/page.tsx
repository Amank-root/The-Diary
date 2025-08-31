// connections/page.tsx
import React from 'react'
import ReactFlowUserConnection from './ReactFlowUserConnection'
import { getConnections } from '@/lib/actions/connections';

async function Connections() {
  const data = await getConnections();

  // Con vert single user data to include connected users
  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <div className='w-full h-full '>
      {/* @ts-expect-error: i don't know */}
      <ReactFlowUserConnection data={data} />
    </div>
  )
}

export default Connections
