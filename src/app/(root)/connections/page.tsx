'use client'
import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls, Background,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type FitViewOptions,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
  type DefaultEdgeOptions,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
const initialNodes: Node[] = [
  // Parent box
  {
    id: 'parent',
    type: 'default',
    data: { label: 'Parent Box' },
    position: { x: 50, y: 50 },
    style: {
      width: 300,
      height: 300,
      border: '2px solid #555',
      backgroundColor: '#f0f0f0',
    },
  },

  // Child box 1
  {
    id: 'child-1',
    data: { label: 'Child 1' },
    position: { x: 20, y: 20 }, // relative to parent
    parentId: 'parent',
    extent: 'parent',
    className: 'w-fit bg-blue-200 top-10',
    draggable: false
  },

  // Child box 2
  {
    id: 'child-2',
    data: { label: 'Child 2' },
    position: { x: 150, y: 100 }, // relative to parent
    parentId: 'parent',
    extent: 'parent',
    style: {
      width: 100,
      height: 10,
      backgroundColor: '#90ee90',
    },
  },
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: 'n1', target: 'n2', type: 'smoothstep', label: 'Edge 1-2' }];

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
  minZoom: 0.5,
  maxZoom: 2,
};
 
const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
    style: { stroke: '#ddd', strokeWidth: 2 },
    type: 'smoothstep',
    

};
 
const onNodeDrag: OnNodeDrag = (_, node) => {
  console.log('drag event', node.data);
};
 
export default function Connections() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
 
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );
 
  return (
    <ReactFlow
      className='border border-black'
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeDrag={onNodeDrag}
      fitView
      fitViewOptions={fitViewOptions}
      defaultEdgeOptions={defaultEdgeOptions}
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
}