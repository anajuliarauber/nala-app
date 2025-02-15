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
  Edge,
} from '@xyflow/react';
import * as Toolbar from '@radix-ui/react-toolbar';
import { useCallback, useEffect } from 'react';

import { Card } from '@/components/Card';
import { createRelation } from '@/services/relations';
import { createPosition, updatePositionCoordinates } from '@/services/positions';
import { getPositionsAsNodes, getRelationsAsEdges } from '../../utils';
import { NodeDragEvent } from './types';

const NODE_TYPES = {
  card: Card,
};

export function Flow() {
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);

  useEffect(() => {
    const fetchRelations = async () => {
      const result = await getRelationsAsEdges();
      setEdges(result);
    };

    const fetchPositions = async () => {
      const result = await getPositionsAsNodes();
      setNodes(result);
    };
    fetchPositions();
    fetchRelations();
  }, [setEdges, setNodes]);

  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdge = addEdge(connection, edges);
      setEdges(newEdge);
      createRelation(newEdge[newEdge.length - 1]);
    },
    [edges, setEdges]
  );

  function addNode() {
    const newNode: Node = {
      id: `${nodes.length === 0 ? 1 : Number(nodes[nodes.length - 1].id) + 1}`,
      type: 'card',
      position: { x: 500, y: 500 },
      data: { label: `Position ${nodes.length + 1}` },
    };
    setNodes([...nodes, newNode]);
    createPosition(newNode);
  }

  const onNodeDragStop = useCallback(
    (_event: React.MouseEvent, node: NodeDragEvent) => {
      setNodes((prevNodes) =>
        prevNodes.map((n) => (n.id === node.id ? { ...n, position: node.position } : n))
      );

      updatePositionCoordinates({ id: Number(node.id), x: node.position.x, y: node.position.y });
    },
    [setNodes]
  );

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
        onNodeDragStop={onNodeDragStop}
      >
        <Background gap={20} size={2} bgColor="#f7f2f2" color="#ccc" />
        <Controls position="bottom-right" />
      </ReactFlow>

      <Toolbar.Root className="absolute top-4 right-4 bg-black text-white rounded-xl shadow-lg px-8 overflow-hidden">
        <Toolbar.Button className="rounded-sm py-3" onClick={addNode}>
          Create a position
        </Toolbar.Button>
      </Toolbar.Root>
    </div>
  );
}
