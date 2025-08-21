import React from 'react'

async function InnerDiary({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;
  return (
    <div>InnerDiary {id}</div>
  )
}

export default InnerDiary