import { Card } from "../Card";
import { AnnotationNode } from "../Tier";

export const NODE_TYPES = {
  card: Card,
  annotation: AnnotationNode,
};

export const SNAP_GRID: [number, number] = [20, 20];

export const TIERS = [
  { id: 1, name: 'Tier 1', snapRange: [0, 200], snapTarget: 80 },
  { id: 2, name: 'Tier 2', snapRange: [200, 400], snapTarget: 330 },
  { id: 3, name: 'Tier 3', snapRange: [400, 800], snapTarget: 590 },
];

export const INITIAL_TIERS = [
  {
    id: 'annotation-1',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 1,
      label: 'Tier 1',
    },
    position: { x: 0, y: 150 },
  },
  {
    id: 'annotation-2',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 2,
      label: 'Tier 2',
    },
    position: { x: 0, y: 400 },
  },
  {
    id: 'annotation-3',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 3,
      label: 'Tier 3',
    },
    position: { x: 0, y: 650 },
  },
];