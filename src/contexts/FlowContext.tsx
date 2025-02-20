'use client';

import { createContext, useContext, useEffect, useCallback, ReactNode } from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnNodeDrag,
} from '@xyflow/react';

import { createRelation } from '@/services/relations';
import { createPosition, updatePosition } from '@/services/positions';
import { getPositionsAsNodes, getRelationsAsEdges } from '@/utils';
import { INITIAL_TIERS, TIERS } from '@/components/Flow/constants';

interface FlowContextType {
  nodes: Node[];
  edges: Edge[];
  onEdgesChange: OnEdgesChange<Edge>;
  onNodesChange: OnNodesChange;
  onConnect: (connection: Connection) => void;
  addNode: (coordinates: { x: number; y: number }) => Promise<Node>;
  onNodeDrag: OnNodeDrag;
  onNodeDragStop: OnNodeDrag;
}

const FlowContext = createContext<FlowContextType | null>(null);

interface FlowProviderProps {
  children: ReactNode;
}

export function FlowProvider({ children }: FlowProviderProps) {
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
    async (connection: Connection) => {
      const newEdge = addEdge(connection, edges);
      setEdges(newEdge);
      await createRelation(newEdge[newEdge.length - 1]);
    },
    [edges, setEdges]
  );

  async function addNode(coordinates: { x: number; y: number }): Promise<Node> {
    const newPosition = await createPosition(coordinates);
    setNodes([...nodes, newPosition]);
    return newPosition;
  }

  const onNodeDrag = useCallback(
    (_: any, node: Node) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id
            ? {
                ...n,
                position: { x: node.position.x, y: node.position.y },
                data: {
                  ...n.data,
                  position: { x: node.position.x, y: node.position.y },
                },
              }
            : n
        )
      );
    },
    [setNodes]
  );

  const onNodeDragStop = useCallback(
    (_: any, node: Node) => {
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
    <FlowContext.Provider
      value={{
        nodes,
        edges,
        onEdgesChange,
        onNodesChange,
        onConnect,
        addNode,
        onNodeDrag,
        onNodeDragStop,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow(): FlowContextType {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
}
