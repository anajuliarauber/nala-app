'use client';

import {
  ReactFlow,
  Background,
  Controls,
  Node,
  ConnectionMode,
  useEdgesState,
  Connection,
  addEdge,
  useNodesState,
} from '@xyflow/react';
import * as Toolbar from '@radix-ui/react-toolbar';
import { useCallback } from 'react';

import { Card } from '@/components/Card';

const NODE_TYPES = {
  card: Card,
};

const INITIAL_NODES: Node[] = [
  {
    id: '1',
    type: 'card',
    position: {
      x: 550,
      y: 100,
    },
    data: {
      isInitialNode: true,
    },
  },
];

export function Flow() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges((edges) => addEdge(connection, edges));
  }, []);
  function addNode() {
    setNodes((nodes) => [
      ...nodes,
      {
        id: '3',
        type: 'card',
        position: {
          x: 500,
          y: 500,
        },
        data: {
          isInitialNode: false,
        },
      },
    ]);
  }
  return (
    <div className="h-[70vh] w-[70vw] border relative">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className="bg-gray-200"
      >
        <Background gap={20} size={2} bgColor="#f7f2f2" color="#ccc" />
        <Controls position='bottom-right' />
      </ReactFlow>

      <Toolbar.Root className="absolute top-4 right-4 bg-black text-white rounded-xl shadow-lg px-8 overflow-hidden">
        <Toolbar.Button
          className="rounded-sm py-3"
          onClick={addNode}
        >Create a position</Toolbar.Button>
      </Toolbar.Root>
    </div>
  );
}
