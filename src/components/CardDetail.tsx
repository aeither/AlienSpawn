"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import NftCard from "./NftCard";
import SkeletonDetails from "./SkeletonDetails";
import type { Tx } from "./Table";
import Table from "./Table";
const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

const CardDetail: FC = () => {
  const { address, isConnected } = useAccount();
  const [txs, setTxs] = useState<Tx[]>();
  const [nft, setNft] = useState<any>();
  const {
    query: { id: tokenId },
  } = useRouter();

  const getNFTs = async () => {
    if (!address || !tokenId) return;

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
  }, [address, tokenId]);

  return (
    <>
      <div className="grid w-full grid-cols-3 flex-row gap-24">
        <div className="col-span-1">
          <NftCard nft={nft} tokenId={String(tokenId)} />
        </div>
        <div className="col-span-2">
          {nft ? (
            <div className="flex flex-col">
              {/* <h2 className="text-xl font-bold text-white">{nft.name}</h2>
              <p className="text-neutral-light">{nft.description}</p> */}
              <div className="rounded-md bg-[#272822] px-2 py-2">
                <DynamicReactJson
                  enableClipboard={false}
                  theme="monokai"
                  src={nft}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <SkeletonDetails />
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col rounded-md bg-neutral-regular p-4">
        <div className="w-full">{txs && <Table txs={txs} />}</div>
      </div>
    </>
  );
};

export default CardDetail;
