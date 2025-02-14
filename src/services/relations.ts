import { Edge } from '@xyflow/react';
import { Routes } from './routes';

export async function createRelation(edge: Edge): Promise<void> {
  try {
    await fetch(Routes.Relations, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sourceId: Number(edge.source),
        targetId: Number(edge.target),
      }),
    });
  } catch (error) {
    throw error;
  }
}

export async function fetchRelations(): Promise<any[]> {
  try {
    const res = await fetch(Routes.Relations);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
