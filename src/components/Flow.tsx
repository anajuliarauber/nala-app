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
    <div className="h-[70vh] w-[70vw] border">
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
        <Controls />
      </ReactFlow>

      <Toolbar.Root className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg border-zinc-300 px-8 h-20 w-96 overflow-hidden">
        <Toolbar.Button
          className="w-32 h-32 bg-violet-500 mt-6 rounded"
          onClick={addNode}
        ></Toolbar.Button>
      </Toolbar.Root>
    </div>
  );
}
