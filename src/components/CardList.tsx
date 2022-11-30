"use client";

import type { FC } from "react";
import type { CardProps } from "./Card";
import Card from "./Card";
import SkeletonCards from "./SkeletonCards";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const tokenId = 0;

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

    const response = await fetch(
      `/api/nfts?address=${address}&tokenId=${tokenId}`
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));

    if (response) {
      console.log(JSON.parse(response.data[0].metadata));
      setNfts(response.data);
    }
  };

  useEffect(() => {
    getNFTs();
  }, [address]);

  return (
    <div>
      <div className="flex w-full flex-col pb-8">
        <h2 className="text-xl font-bold text-white">Title</h2>
        <p className="text-neutral-light">Description</p>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {/* {nfts ? (
          nfts.map((nft) => {
            const data: CardProps = {
              title: String(nft.metadata.name) || "",
              description: nft.metadata.description || "",
              image: nft.metadata.image || "",
              btnText: "Hatch",
              btnAction: async () => {
                console.log("btn click!");
              },
            };

            return (
              <>
                <Card {...data} />
              </>
            );
          })
        ) : (
          <SkeletonCards />
        )} */}
      </div>
    </div>
  );
};

export default CardList;
