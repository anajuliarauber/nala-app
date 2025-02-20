import { NodeProps } from "@xyflow/react";

interface AnnotationNodeProps extends NodeProps {
  data: {
    label: React.ReactNode;
  };
}

export function AnnotationNode({ data }: AnnotationNodeProps) {
  return (
    <div className="annotation-content -rotate-90">
      <div className="text-lg w-[360px] text-center py-1 shadow-md rounded-md bg-white border-2 border-stone-400">
        {data.label}
      </div>
    </div>
  );
}
