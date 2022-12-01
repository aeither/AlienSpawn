"use client";

import type { CardProps, Traits } from "./Card";
import Card from "./Card";

const NftCard = ({ nft, tokenId }: { nft: any; tokenId: string }) => {
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

export default NftCard;
