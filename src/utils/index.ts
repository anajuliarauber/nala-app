import { Edge, Node } from '@xyflow/react';

import { fetchPositions } from '@/services/positions';
import { fetchRelations } from '@/services/relations';

export function transformPositionsToNodes(data: any[]): Node[] {
  return data.map((item) => {
    return {
      id: String(item.id),
      type: 'card',
      position: {
        x: item.x,
        y: item.y,
      },
      data: {
        division: item.division,
        title: item.title,
        tier: item.id,
      },
    };
  });
}

export async function getPositionsAsNodes(): Promise<Node[]> {
  const data = await fetchPositions();
  return transformPositionsToNodes(data);
}

export function transformRelationsToEdges(data: any[]): Edge[] {
  return data.map((item) => ({
    id: String(item.id),
    source: String(item.sourceId),
    target: String(item.targetId),
    sourceHandle: 'bottom',
    targetHandle: 'top',
  }));
}

export async function getRelationsAsEdges(): Promise<Edge[]> {
  const data = await fetchRelations();
  return transformRelationsToEdges(data);
}