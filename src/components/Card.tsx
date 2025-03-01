import { useFlow } from '@/contexts/FlowContext';
import { useGetDivisions } from '@/hooks/useGetDivisions';
import { updatePosition } from '@/services/positions';
import { Button, Select, TextField } from '@radix-ui/themes';
import { Handle, NodeProps, Position } from '@xyflow/react';
import React, { useState } from 'react';
import { getNodeTier } from '@/utils';

interface CardProps extends NodeProps {
  data: {
    id: string;
    title: string;
    division: {
      id: number;
      name: string;
    };
    position: {
      x: number;
      y: number;
    };
  };
}

export function Card({ data }: CardProps) {
  const [position, setPosition] = useState<string>(data.title || '');
  const [division, setDivision] = useState<number>(data.division.id);
  const { addNode, onConnect } = useFlow();

  const divisions = useGetDivisions();

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
  };

  const handleDivisionChange = (value: string) => {
    setDivision(Number(value));
  };

  const handleSavePosition = () => {
    updatePosition({ id: Number(data.id), updates: { title: position, divisionId: division } });
  };

  const handleCreateNode = async () => {
    const coordinates = {
      x: data.position.x,
      y: data.position.y + 340,
    };
    const newNode = await addNode(coordinates);
    onConnect({
      source: data.id,
      target: newNode.id,
      sourceHandle: 'bottom',
      targetHandle: 'top',
    });
  };

  const nodeTier = getNodeTier(data.position);

  return (
    <div>
      <div className="p-4 pt-2 shadow-md rounded-md bg-white border-2 border-stone-400 drag-handle">
        <div className="flex flex-col gap-3">
          <label className="self-end w-1/6 text-sm">
            <div className="bg-indigo-100 p-1 rounded-2xl text-center">{nodeTier}</div>
          </label>
          <TextField.Root placeholder="Position" value={position} onChange={handlePositionChange} />
          <Select.Root value={String(division)} onValueChange={handleDivisionChange}>
            <Select.Trigger placeholder="Division" />
            <Select.Content>
              {divisions.map((division) => (
                <Select.Item key={division.id} value={String(division.id)}>
                  {division.name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
          <Button
            onClick={handleSavePosition}
            className="text-white font-medium px-4 py-2 rounded-md shadow-md transition"
          >
            Save
          </Button>
        </div>

        <Handle id="bottom" type="source" position={Position.Bottom} className="invisible " />
        <Handle id="top" type="target" position={Position.Top} />
      </div>
      <div className="flex justify-center mt-1">
        <Button
          className="rounded cursor-pointer border"
          highContrast
          onClick={handleCreateNode}
          onMouseDown={(e) => e.stopPropagation()}
        >
          +
        </Button>
      </div>
    </div>
  );
}
