// connections/page.tsx
import React from 'react'
import ReactFlowUserConnection from './ReactFlowUserConnection'
import { authSessionServer } from '@/lib/auth';
import { getProfile } from '@/lib/actions/profile';

async function Connections() {
  const session = await authSessionServer();
  const data = await getProfile(session?.user.username || "");
  
  // Convert single user data to include connected users
  if (!data) {
    return <div>No data found</div>;
  }

  // Create an array of users including the current user and their connections
  const users = [
    // Current user
    data,
    // Users that the current user is reading
    ...data.reading.map(reading => ({
      id: reading.readingId,
      name: `User ${reading.readingId.slice(0, 8)}`, // You'll need to fetch actual user data
      username: `user_${reading.readingId.slice(0, 8)}`,
      diaryCount: 0, // These would come from actual user data
      pageCount: 0,
      reading: [],
      readers: [],
    })),
    // Users that are reading the current user
    ...data.readers.map(reader => ({
      id: reader.readerId,
      name: `Reader ${reader.readerId.slice(0, 8)}`, // You'll need to fetch actual user data
      username: `reader_${reader.readerId.slice(0, 8)}`,
      diaryCount: 0,
      pageCount: 0,
      reading: [],
      readers: [],
    }))
  ];

  // Remove duplicates based on id
  const uniqueUsers = users.filter((user, index, self) => 
    index === self.findIndex(u => u.id === user.id)
  );

  return (
    <div className='w-full h-full '>
      <ReactFlowUserConnection users={uniqueUsers} />
    </div>
  )
}

export default Connections

// 'use client'
// import { useState, useCallback } from 'react';
// import {
//   ReactFlow,
//   Controls, Background,
//   addEdge,
//   applyNodeChanges,
//   applyEdgeChanges,
//   type Node,
//   type Edge,
//   type FitViewOptions,
//   type OnConnect,
//   type OnNodesChange,
//   type OnEdgesChange,
//   type OnNodeDrag,
//   type DefaultEdgeOptions,
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
 
// const initialNodes: Node[] = [
//   // Parent box
//   {
//     id: 'parent',
//     type: 'default',
//     data: { label: 'Parent Box' },
//     position: { x: 50, y: 50 },
//     style: {
//       width: 300,
//       height: 300,
//       border: '2px solid #555',
//       backgroundColor: '#f0f0f0',
//     },
//   },

//   // Child box 1
//   {
//     id: 'child-1',
//     data: { label: 'Child 1' },
//     position: { x: 20, y: 20 }, // relative to parent
//     parentId: 'parent',
//     extent: 'parent',
//     className: 'w-fit bg-blue-200 top-10',
//     draggable: false
//   },

//   // Child box 2
//   {
//     id: 'child-2',
//     data: { label: 'Child 2' },
//     position: { x: 150, y: 100 }, // relative to parent
//     parentId: 'parent',
//     extent: 'parent',
//     style: {
//       width: 100,
//       height: 10,
//       backgroundColor: '#90ee90',
//     },
//   },
// ];

// const initialEdges: Edge[] = [{ id: 'e1-2', source: 'n1', target: 'n2', type: 'smoothstep', label: 'Edge 1-2' }];

// const fitViewOptions: FitViewOptions = {
//   padding: 0.2,
//   minZoom: 0.5,
//   maxZoom: 2,
// };
 
// const defaultEdgeOptions: DefaultEdgeOptions = {
//   animated: true,
//     style: { stroke: '#ddd', strokeWidth: 2 },
//     type: 'smoothstep',
    

// };
 
// const onNodeDrag: OnNodeDrag = (_, node) => {
//   console.log('drag event', node.data);
// };
 
// export default function Connections() {
//   const [nodes, setNodes] = useState<Node[]>(initialNodes);
//   const [edges, setEdges] = useState<Edge[]>(initialEdges);
 
//   const onNodesChange: OnNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     [setNodes],
//   );
//   const onEdgesChange: OnEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     [setEdges],
//   );
//   const onConnect: OnConnect = useCallback(
//     (connection) => setEdges((eds) => addEdge(connection, eds)),
//     [setEdges],
//   );
 
//   return (
//     <ReactFlow
//       className='border border-black'
//       nodes={nodes}
//       edges={edges}
//       onNodesChange={onNodesChange}
//       onEdgesChange={onEdgesChange}
//       onConnect={onConnect}
//       onNodeDrag={onNodeDrag}
//       fitView
//       fitViewOptions={fitViewOptions}
//       defaultEdgeOptions={defaultEdgeOptions}
//     >
//       <Controls />
//       <Background />
//     </ReactFlow>
//   );
// }