import { Card } from "../Card";
import { AnnotationNode } from "../Tier";

export const NODE_TYPES = {
  card: Card,
  annotation: AnnotationNode,
};

export const SNAP_GRID: [number, number] = [20, 20];

export const TIERS = [
  { id: 1, name: 'Tier 1', snapRange: [0, 230], snapTarget: 40 },
  { id: 2, name: 'Tier 2', snapRange: [230, 600], snapTarget:400},
  { id: 3, name: 'Tier 3', snapRange: [600, 970], snapTarget: 800 },
  { id: 4, name: 'Tier 4', snapRange: [970, 1350], snapTarget: 1200 },
  { id: 5, name: 'Tier 5', snapRange: [1350, 1800], snapTarget: 1560 },
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
    position: { x: 0, y: 125 },
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
    position: { x: 0, y: 500 },
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
    position: { x: 0, y: 875 },
  },
  {
    id: 'annotation-4',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 4,
      label: 'Tier 4',
    },
    position: { x: 0, y: 1250 },
  },
  {
    id: 'annotation-5',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 5,
      label: 'Tier 5',
    },
    position: { x: 0, y: 1625},
  },
];