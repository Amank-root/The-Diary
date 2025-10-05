// ReactFlowUserConnection.tsx
'use client';

import React, { useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
  Node,
  Edge,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

type DiaryData = {
  id: string;
  name: string | null;
  username: string | null;
  image: string | null;
  readers: Array<{
    id: string;
    createdAt: Date;
    reader: {
      id: string;
      name: string | null;
    };
  }>;
  reading: Array<{
    id: string;
    createdAt: Date;
    reading: {
      id: string;
      name: string | null;
    };
  }>;
  _count: {
    diaries: number;
  };
  diaries: Array<{
    id: string;
    title: string;
    createdAt: Date;
    types: string;
    _count: {
      pages: number;
    };
    pages: Array<{
      id: string;
      createdAt: Date;
    }>;
  }>;
};

const diaryTypeColors = {
  PERSONAL: '#ef4444', // red
  SPECIAL: '#8b5cf6', // purple
  GENERAL: '#10b981', // green
  DEFAULT: '#6b7280', // gray
};

export default function ReactFlowUserConnection({ data }: { data: DiaryData }) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    if (!data) return;

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    nodes.push({
      id: 'central-user',
      position: { x: 500, y: 300 },
      data: {
        label: (
          <div className="text-center p-4">
            <Avatar className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white font-bold text-xl bg-blue-500">
              <AvatarImage
                src={data.image || undefined}
                alt={data.name || 'User'}
              />
              <AvatarFallback>
                <div>
                  {(data.name || 'User')
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </div>
              </AvatarFallback>
            </Avatar>
            {/* <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl bg-blue-500">
              {(data.name || 'User')
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </div> */}
            <div className="font-bold text-lg">
              {data.name || 'Unknown User'}
            </div>
            <div className="text-sm text-gray-600">@{data.username}</div>
            <div className="text-xs text-blue-600 font-semibold mt-2">YOU</div>
          </div>
        ),
      },
      style: {
        padding: 0,
        border: '4px solid #3b82f6',
        borderRadius: 20,
        background: '#ffffff',
        color: '#000',
        boxShadow: '0 10px 25px -3px rgba(59, 130, 246, 0.4)',
        width: 220,
        height: 180,
        textAlign: 'center',
      },
      type: 'default',
    });

    nodes.push({
      id: 'diaries-container',
      position: { x: 100, y: 50 },
      data: {
        label: (
          <div className="p-4">
            <h3 className="font-bold text-lg mb-3 text-center">
              📚 My Diaries
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {data.diaries.map((diary) => {
                const color =
                  diaryTypeColors[
                    diary.types as keyof typeof diaryTypeColors
                  ] || diaryTypeColors.DEFAULT;
                return (
                  <div
                    key={diary.id}
                    className="flex items-center gap-2 p-2 rounded-lg border dark:border-gray-600"
                    style={{ borderLeft: `4px solid ${color}` }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{diary.title}</div>
                      <div className="text-xs text-gray-500">
                        {diary.types} • {diary.pages.length} pages
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-2 border-t text-center text-sm text-gray-600">
              Total: {data._count.diaries} diaries •{' '}
              {data.diaries.reduce((sum, d) => sum + d.pages.length, 0)} pages
            </div>
          </div>
        ),
      },
      style: {
        padding: 0,
        border: '2px solid #e5e7eb',
        borderRadius: 16,
        background: '#f9fafb',
        color: '#000',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        width: 300,
        minHeight: 200,
      },
      type: 'default',
    });

    nodes.push({
      id: 'readers-container',
      position: { x: 800, y: -10 },
      data: {
        label: (
          <div className="p-4">
            <h3 className="font-bold text-lg mb-3 text-center text-green-700 dark:text-green-400">
              👥 Followers
            </h3>
            <div className="space-y-2">
              {data.readers.length > 0 ? (
                data.readers.map((reader, index) => (
                  <div
                    key={reader.id}
                    className="flex items-center gap-3 p-2 rounded-lg bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-600"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      {/* <div className="font-semibold text-sm dark:text-white">Follower {index + 1}</div> */}
                      <div className="font-semibold text-sm dark:text-white">
                        {reader.reader.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">
                        Since {new Date(reader.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4 dark:text-gray-300">
                  No followers yet
                </div>
              )}
            </div>
            <div className="mt-3 pt-2 border-t text-center text-sm text-green-600 font-semibold dark:text-green-400">
              {data.readers.length} followers
            </div>
          </div>
        ),
      },
      style: {
        padding: 0,
        border: '2px solid #10b981',
        borderRadius: 16,
        background: '#f0fdf4',
        boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)',
        width: 280,
        minHeight: 200,
      },
      type: 'default',
    });

    nodes.push({
      id: 'reading-container',
      position: { x: 500, y: 600 },
      data: {
        label: (
          <div className="p-4">
            <h3 className="font-bold text-lg mb-3 text-center text-orange-700 dark:text-orange-400">
              👁️ Following
            </h3>
            <div className="space-y-2">
              {data.reading.length > 0 ? (
                data.reading.map((reading, index) => (
                  <div
                    key={reading.id}
                    className="flex items-center gap-3 p-2 rounded-lg bg-orange-50 dark:bg-orange-900 border border-orange-200 dark:border-orange-600"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm dark:text-white">
                        {reading.reading.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">
                        Since {new Date(reading.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4 dark:text-gray-300">
                  Not following anyone
                </div>
              )}
            </div>
            <div className="mt-3 pt-2 border-t text-center text-sm text-orange-600 font-semibold dark:text-orange-400">
              {data.reading.length} following
            </div>
          </div>
        ),
      },
      style: {
        padding: 0,
        border: '2px solid #f59e0b',
        borderRadius: 16,
        background: '#fffbeb',
        boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.2)',
        width: 280,
        minHeight: 200,
      },
      type: 'default',
    });

    edges.push(
      {
        id: 'diaries-to-user',
        source: 'diaries-container',
        target: 'central-user',
        animated: true,
        style: { stroke: '#6366f1', strokeWidth: 3 },
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: 'readers-to-user',
        source: 'readers-container',
        target: 'central-user',
        label: 'follow you',
        animated: true,
        style: { stroke: '#10b981', strokeWidth: 3 },
        markerEnd: { type: MarkerType.ArrowClosed },
        labelStyle: { fontSize: 12, fontWeight: 'bold' },
      },
      {
        id: 'user-to-reading',
        source: 'central-user',
        target: 'reading-container',
        label: 'you follow',
        animated: true,
        style: { stroke: '#f59e0b', strokeWidth: 3 },
        markerEnd: { type: MarkerType.ArrowClosed },
        labelStyle: { fontSize: 12, fontWeight: 'bold' },
      }
    );

    setNodes(nodes);
    setEdges(edges);
  }, [data]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 dark:text-gray-300">
          No connection data available
        </p>
      </div>
    );
  }

  return (
    <div className="w-full relative h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 dark:text-white">
      {/* Legend */}
      <div className="absolute top-8 left-4 z-10 bg-white dark:bg-gray-800 dark:border-gray-700 p-4 rounded-lg shadow-lg border">
        <h3 className="font-semibold mb-3">Diary Types</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span>Personal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            <span>Special</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span>General</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="absolute top-8 right-4 z-10 bg-white dark:bg-gray-800 dark:border-gray-700 p-4 rounded-lg shadow-lg border">
        <h3 className="font-semibold mb-3">Quick Stats</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <span>📚 Diaries:</span>
            <span className="font-bold">{data._count.diaries}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>📄 Pages:</span>
            <span className="font-bold">
              {data.diaries.reduce((sum, d) => sum + d.pages.length, 0)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span>👥 Followers:</span>
            <span className="font-bold text-green-600 dark:text-green-400">
              {data.readers.length}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span>👁️ Following:</span>
            <span className="font-bold text-orange-600 dark:text-orange-400">
              {data.reading.length}
            </span>
          </div>
        </div>
      </div>

      {/* ReactFlow Canvas */}
      <ReactFlow
        className="dark:text-black"
        nodes={nodes}
        edges={edges}
        fitView
        // defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
        minZoom={0.4}
        maxZoom={1.2}
        nodesDraggable={true}
      >
        <Background
          color="#dbeafe"
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}
