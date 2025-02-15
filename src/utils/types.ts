export interface Position {
  id: string;
  title: string;
  tier: number;
  division: number;
  x: number;
  y: number;
}

export interface Relation {
  id: string;
  sourceId: string;
  targetId: string;
  createdAt: string;
}
