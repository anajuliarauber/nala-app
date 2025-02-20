'use client';

import { ReactFlow, Background, Controls, ConnectionMode, ConnectionLineType } from '@xyflow/react';

import { NODE_TYPES, SNAP_GRID } from './constants';
import { useFlow } from '@/contexts/FlowContext';

export function Flow() {
  const { edges, nodes, onConnect, onEdgesChange, onNodeDrag, onNodeDragStop, onNodesChange } =
    useFlow();

  return (
    <div className="h-[80vh] w-full border relative">
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
    </div>
  );
}
