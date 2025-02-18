export interface Position {
  id: string;
  title: string;
  divisionId: number;
  division: {
    name: string
  }
  x: number;
  y: number;
}

export interface Relation {
  id: string;
  sourceId: string;
  targetId: string;
  createdAt: string;
}

export enum Division {
  'Operations' = 1,
  'Marketing' = 2,
  'Finance' = 3,
  'Human Resources' = 4,
  'IT' = 5,
  'Sales' = 6,
  'Customer Service' = 7,
}
