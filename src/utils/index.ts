import { Edge, Node } from '@xyflow/react';

import { fetchPositions } from '@/services/positions';
import { fetchRelations } from '@/services/relations';
import { Position, Relation } from './types';
import { TIERS } from '@/components/Flow/constants';

export function transformPositionsToNodes(data: Position[]): Node[] {
  return data.map((item) => {
    return {
      id: String(item.id),
      type: 'card',
      dragHandle: '.drag-handle',
      position: {
        x: item.x,
        y: item.y,
      },
      data: {
        division: item.division,
        title: item.title,
        id: String(item.id),
        position: {
          x: item.x,
          y: item.y,
        },
      },
    };
  });
}

export async function getPositionsAsNodes(): Promise<Node[]> {
  const data = await fetchPositions();
  return transformPositionsToNodes(data);
}

export function transformRelationsToEdges(data: Relation[]): Edge[] {
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

export function getNodeTier(position: { x: number; y: number }): number {
  const node = TIERS.find((tier) => {
    return position.y >= tier.snapRange[0] && position.y <= tier.snapRange[1];
  });
  return node?.id || 1;
}
