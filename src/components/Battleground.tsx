"use client";

import { DndContext } from "@dnd-kit/core";
import { FC, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useDomLoaded } from "../hooks/dom";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

const Battleground: FC = () => {
  const { domLoaded } = useDomLoaded();
  const [isDragging, setIsDragging] = useState(false);
  const { address, isConnected } = useAccount();
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = <Draggable>Drag me</Draggable>;
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  function handleDragEnd(event: any) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    } else {
      setIsDropped(false);
    }

    setIsDragging(false);
  }

  if (domLoaded && isConnected)
    return (
      <>
        <DndContext
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setIsDragging(false)}
        >
          <div className="flex p-6">
            {!isDropped ? draggableMarkup : null}
            <Droppable>{isDropped ? draggableMarkup : "Drop here"}</Droppable>
          </div>
        </DndContext>
      </>
    );

  return <button onClick={() => connect()}>Connect Wallet</button>;
};

export default Battleground;
