"use client";

import { DndContext } from "@dnd-kit/core";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useDomLoaded } from "../hooks/dom";
import BattleCard from "./BattleCard";
import type { CardProps, Traits } from "./Card";
import Draggable from "./Draggable";
import { Droppable } from "./Droppable";
import SkeletonDetails from "./SkeletonDetails";

interface Nfts {
  tokenId: string;
  owner: string;
  metadata: string;
}

interface BattlegroundLeftProps {
  opponentId: string | undefined;
  setOpponentId: any;
}

const BattlegroundRight: FC<BattlegroundLeftProps> = ({
  opponentId,
  setOpponentId,
}) => {
  const { domLoaded } = useDomLoaded();
  const { address, isConnected } = useAccount();
  const [isDragging, setIsDragging] = useState(false);
  const [isDropped, setIsDropped] = useState(false);

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
      setOpponentId(event.active.id);
    } else {
      setIsDropped(false);
    }

    console.log(event);
    setIsDragging(false);
  }

  const depositedTokenId = <div>Alien #{opponentId}</div>;

  if (domLoaded && isConnected)
    return (
      <>
        <DndContext
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setIsDragging(false)}
        >
          <div className="w-full text-center">
            <h2 className="text-xl font-bold text-white">
              2. Select your opponent
            </h2>
          </div>
          <div className="flex flex-row-reverse items-center justify-between p-6">
            <div className="flex h-96 flex-col gap-4 overflow-x-auto overflow-y-scroll p-8">
              {nfts ? (
                nfts.map((nft) => {
                  if (nft.owner === address?.toLowerCase()) return;

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
                        <div className="w-52">
                          <BattleCard {...data} />
                        </div>
                      </Draggable>
                    </>
                  );
                })
              ) : (
                <SkeletonDetails />
              )}
            </div>

            <Droppable>{isDropped ? depositedTokenId : "Drop here"}</Droppable>
          </div>
        </DndContext>
      </>
    );

  return <button onClick={() => connect()}>Connect Wallet</button>;
};

export default BattlegroundRight;
