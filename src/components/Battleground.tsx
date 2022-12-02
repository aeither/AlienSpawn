"use client";

import { DndContext } from "@dnd-kit/core";
import { FC, useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useDomLoaded } from "../hooks/dom";
import BattleCard from "./BattleCard";
import type { CardProps, Traits } from "./Card";
import Draggable from "./Draggable";
import { Droppable } from "./Droppable";
import SkeletonCards from "./SkeletonCards";

interface Nfts {
  tokenId: string;
  owner: string;
  metadata: string;
}

const Battleground: FC = () => {
  const { domLoaded } = useDomLoaded();
  const [isDragging, setIsDragging] = useState(false);
  const { address, isConnected } = useAccount();
  const [isDropped, setIsDropped] = useState(false);
  const [attackerId, setAttackerId] = useState(null);

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  // get list of nfts
  const [nfts, setNfts] = useState<Nfts[]>();

  const getNFTs = async () => {
    if (!address) return;

    const response = await fetch(`/api/nfts`)
      .then((response) => response.json())
      .catch((err) => console.error(err));

    if (response) {
      setNfts(response.data);
    }
  };
  useEffect(() => {
    getNFTs();
  }, [address]);

  // on drop
  function handleDragEnd(event: any) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
      setAttackerId(event.active.id);
    } else {
      setIsDropped(false);
    }

    console.log(event);
    setIsDragging(false);
  }

  const depositedTokenId = <div>Alien #{attackerId}</div>;

  if (domLoaded && isConnected)
    return (
      <>
        <DndContext
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setIsDragging(false)}
        >
          <div className="flex p-6">
            {nfts ? (
              nfts.map((nft) => {
                const metadata = JSON.parse(nft.metadata);

                const traits: Traits = {
                  stamina: 0,
                  strength: 0,
                  health: 0,
                };

                metadata.traits.map(
                  ({
                    trait_type,
                    value,
                  }: {
                    trait_type: keyof Traits;
                    value: number;
                  }) => {
                    traits[trait_type] = value;
                  }
                );

                const data: CardProps = {
                  title: metadata.name || "",
                  description: metadata.description || "",
                  image: metadata.image || "",
                  traits: traits,
                  btnText: "Details",
                  tokenId: nft.tokenId,
                };

                return (
                  <>
                    <Draggable tokenId={nft.tokenId}>
                      <BattleCard {...data} />
                    </Draggable>
                  </>
                );
              })
            ) : (
              <SkeletonCards />
            )}
            <Droppable>
              {isDropped ? depositedTokenId : "Drop your alien here"}
            </Droppable>
          </div>
        </DndContext>
        <p>attacker: {attackerId}</p>
        <button className="btn-primary btn">Battle!</button>
      </>
    );

  return <button onClick={() => connect()}>Connect Wallet</button>;
};

export default Battleground;
