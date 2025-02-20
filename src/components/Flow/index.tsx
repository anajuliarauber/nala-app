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


import { createRelation } from '@/services/relations';
import { createPosition, updatePosition } from '@/services/positions';
import { getPositionsAsNodes, getRelationsAsEdges } from '../../utils';

import { NODE_TYPES, INITIAL_TIERS, SNAP_GRID,TIERS } from './constants';



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
      setNodes([...result, ...INITIAL_TIERS]);
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

  async function addNode() {
    const newPosition = await createPosition();
    setNodes([...nodes, newPosition]);
  }

  const onNodeDrag = useCallback(
    (_, node: Node) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id ? { ...n, position: { x: node.position.x, y: node.position.y } } : n
        )
      );
    },
    [setNodes]
  );

  const onNodeDragStop = useCallback(
    (_, node: Node) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === node.id) {
            const tier = TIERS.find(
              (t) => node.position.y >= t.snapRange[0] && node.position.y <= t.snapRange[1]
            );
            const newPosition = tier ? { x: node.position.x, y: tier.snapTarget } : node.position;
            return { ...n, position: newPosition };
          }
          return n;
        })
      );
      updatePosition({ id: Number(node.id), updates: { x: node.position.x, y: node.position.y } });
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
        onNodeDrag={onNodeDrag}
        snapToGrid={true}
        snapGrid={SNAP_GRID}
        connectionLineType={ConnectionLineType.SmoothStep}
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
