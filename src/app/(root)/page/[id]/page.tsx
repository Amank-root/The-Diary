import React from 'react'

async function DiaryPage({params}:{params:Promise<{id:string}>}) {
  const resolvedParams = await params;

  return (
    <div>DiaryPage {resolvedParams.id}</div>
  )
}

export default DiaryPage