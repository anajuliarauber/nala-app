import { useGetDivisions } from '@/hooks/useGetDivisions';
import { updatePosition } from '@/services/positions';
import { Button, Select, TextField } from '@radix-ui/themes';
import { Handle, NodeProps, Position } from '@xyflow/react';
import React, { useState } from 'react';

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

  return (
    <div className="p-6 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex flex-col gap-3">
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
      <Handle id="bottom" type="source" position={Position.Bottom} />
      <Handle id="top" type="target" position={Position.Top} />
    </div>
  );
}
