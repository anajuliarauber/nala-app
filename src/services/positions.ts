import { Routes } from './routes';
import { Node } from '@xyflow/react';
import { Position } from '@/utils/types';

export async function createPosition(position: Node): Promise<void> {
  try {
    await fetch(Routes.Positions, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: position.data.title ?? `Position ${position.id}`,
        tier: position.data.tier ?? 1,
        divisionId: position.data.divisionId ?? 1,
        x: 300,
        y: 400,
      }),
    });
  } catch (error) {
    throw error;
  }
}

export async function fetchPositions(): Promise<Position[]> {
  try {
    const res = await fetch(Routes.Positions);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

interface UpdatePosition {
  id: number;
  updates: Partial<Position>;
}
export async function updatePosition({ id, updates }: UpdatePosition): Promise<void> {
  try {
    await fetch(Routes.Positions, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    });
  } catch (error) {
    throw error;
  }
}
