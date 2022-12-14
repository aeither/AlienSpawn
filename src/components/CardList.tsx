"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import type { CardProps, Traits } from "./Card";
import Card from "./Card";
import SkeletonCards from "./SkeletonCards";

interface Nfts {
  tokenId: string;
  owner: string;
  metadata: string;
}

const CardList: FC = () => {
  const { address, isConnected } = useAccount();
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

  return (
    <>
      <div className="grid w-full grid-cols-4 gap-8">
        {nfts ? (
          nfts.map((nft) => {
            if (nft.owner !== address?.toLowerCase()) return;

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
            console.log("Traits: ", traits);

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
                <Card {...data} />
              </>
            );
          })
        ) : (
          <SkeletonCards />
        )}
      </div>
    </>
  );
};

export default CardList;
