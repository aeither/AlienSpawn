"use client";

import type { FC } from "react";
import type { CardProps, Traits } from "./Card";
import Card from "./Card";
import SkeletonCards from "./SkeletonCards";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

interface Nfts {
  tokenId: string;
  owner: string;
  metadata: string;
}

const CardDetail: FC = () => {
  const { address, isConnected } = useAccount();
  const [txs, setTxs] = useState([]);
  const [nft, setNft] = useState<any>();
  const {
    query: { id: tokenId },
  } = useRouter();

  const getNFTs = async () => {
    if (!address) return;

    const response = await fetch(
      `/api/txs?address=${address}&tokenId=${tokenId}`
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));

    const response_metadata = await fetch(`/api/nft?tokenId=${tokenId}`)
      .then((response) => response.json())
      .catch((err) => console.error(err));

    if (response_metadata && response_metadata.data) {
      console.log(JSON.parse(response_metadata.data));
      setNft(JSON.parse(response_metadata.data));
    }
    if (response) {
      console.log(response.data);
      setTxs(response.data);
    }
  };

  useEffect(() => {
    getNFTs();
  }, [address]);

  const NftCard = () => {
    if (!nft) return <></>;

    const traits: Traits = {
      stamina: 0,
      strength: 0,
      health: 0,
    };

    nft.traits.map(
      ({ trait_type, value }: { trait_type: keyof Traits; value: number }) => {
        traits[trait_type] = value;
      }
    );
    console.log("Traits: ", traits);

    const data: CardProps = {
      title: nft.name || "",
      description: nft.description || "",
      image: nft.image || "",
      traits: traits,
      btnText: "",
      tokenId: String(tokenId),
    };

    return (
      <>
        <Card {...data} />
      </>
    );
  };

  return (
    <div className="grid w-full grid-cols-3 flex-row gap-28">
      <div className="col-span-1">
        <NftCard />
      </div>
      <div className="col-span-2">
        {nft && (
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white">{nft.name}</h2>
            <p className="text-neutral-light">{nft.description}</p>
            <div className="rounded-md bg-[#272822] px-2 py-2">
              <DynamicReactJson
                enableClipboard={false}
                theme="monokai"
                src={nft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDetail;
