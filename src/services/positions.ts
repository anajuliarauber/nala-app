import { Node } from '@xyflow/react';
import { Routes } from './routes';

import { Position } from '@/utils/types';

export async function createPosition(): Promise<Node> {
  try {
    const positionData = {
      title: `Position`,
      divisionId: 1,
      x: 300,
      y: 400,
    };

    const response = await fetch(Routes.Positions, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(positionData),
    });

    if (!response.ok) {
      throw new Error('Failed to create position');
    }

    const data = await response.json();
    const formattedData = {
      id: String(data.id),
      position: {
        x: data.x,
        y: data.y,
      },
      type: "card",
      data: {
        id: data.id,
        title: data.title,
        division: {
          id: data.divisionId,
        }
      }
    };
    return formattedData;
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
