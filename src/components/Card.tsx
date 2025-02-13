import { useGetDivisions } from '@/hooks/useGetDivisions';
import { Select, TextField } from '@radix-ui/themes';
import { Handle, NodeProps, Position } from '@xyflow/react';
import React from 'react';

export function Card({ data }: NodeProps) {
  const divisions = useGetDivisions();

  return (
    <div className="p-6 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex flex-col items-center gap-3">
        <TextField.Root placeholder="Position" />
        <Select.Root>
          <Select.Trigger placeholder="Division" />
          <Select.Content>
            {divisions.map((division) => (
              <Select.Item key={division.id} value={division.name}>
                {division.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>
      <Handle id="bottom" type="source" position={Position.Bottom} />
      {!data.isInitialNode && <Handle id="top" type="source" position={Position.Top} />}
    </div>
  );
}
