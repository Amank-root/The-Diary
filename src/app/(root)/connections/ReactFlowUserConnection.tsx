// ReactFlowUserConnection.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MarkerType,
  Node,
  Edge 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

type User = {
  id: string;
  name: string;
  username: string;
  profileImage?: string;
  diaryCount: number;
  pageCount: number;
  reading: { readingId: string }[];
  readers: { readerId: string }[];
};

export default function ReactFlowUserConnection({ users }: { users: User[] }) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    if (!users || users.length === 0) return;

    // Create nodes with better positioning
    const createdNodes: Node[] = users.map((user, index) => {
      const angle = (index * 2 * Math.PI) / users.length;
      const radius = 200;
      const x = 300 + radius * Math.cos(angle);
      const y = 300 + radius * Math.sin(angle);

      return {
        id: user.id,
        position: { x, y },
        data: {
          label: (
            <div className="text-center">
              {user.profileImage && (
                <img 
                  src={user.profileImage} 
                  alt={user.name}
                  className="w-12 h-12 rounded-full mx-auto mb-2"
                />
              )}
              <div className="font-bold">{user.name}</div>
              <div className="text-sm text-gray-600">@{user.username}</div>
              <div className="text-xs">
                📖 {user.diaryCount} | 📄 {user.pageCount}
              </div>
            </div>
          ),
        },
        style: {
          padding: 16,
          border: '2px solid #e5e7eb',
          borderRadius: 12,
          background: '#ffffff',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          width: 180,
          textAlign: 'center',
        },
        type: 'default', // Add explicit type
      };
    });

    // Create edges for reading relationships
    const createdEdges: Edge[] = users.flatMap((user) =>
      user.reading
        .filter(r => users.some(u => u.id === r.readingId))
        .map((r) => ({
          id: `${user.id}-${r.readingId}`,
          source: user.id,
          target: r.readingId,
          label: 'follows',
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          style: {
            stroke: '#6366f1',
            strokeWidth: 2,
          },
        }))
    );

    setNodes(createdNodes);
    setEdges(createdEdges);
  }, [users]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        fitView
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}