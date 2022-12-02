import type { FC } from "react";
import React from "react";
import { useDraggable } from "@dnd-kit/core";

interface DraggableProps {
  tokenId: string;
  children: React.ReactNode;
}

const Draggable: FC<DraggableProps> = ({ tokenId, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tokenId,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
};

export default Draggable;
