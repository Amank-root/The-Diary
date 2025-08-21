import React from 'react'

async function SharedProfile({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    console.log("Shared Profile ID:", id);
  return (
    <div>{id}</div>
  )
}

export default SharedProfile