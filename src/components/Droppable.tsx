import React from "react";
import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "h-fit m-8 rounded-md bg-neutral-regular p-4 flex-1 text-center ",
        isOver && "border border-primary"
      )}
    >
      {props.children}
    </div>
  );
}
