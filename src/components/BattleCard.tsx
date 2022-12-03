import { MediaRenderer } from "@thirdweb-dev/react";
import type { FC } from "react";

export interface CardProps {
  title: string;
  description: string;
  image: string;
  btnText: string;
  traits: Traits;
  disabled?: boolean;
  tokenId: string;
}

export type Traits = {
  [key in "stamina" | "strength" | "health"]: number;
};

const BattleCard: FC<CardProps> = ({
  title,
  description,
  image,
  traits,
  btnText,
  tokenId,
}) => {
  return (
    <div className="card w-auto rounded-md bg-neutral-regular transition duration-300 ">
      <figure>
        <MediaRenderer className="w-full" src={image} alt={"nft"} />
      </figure>
      <div className="card-body">
        <div className="flex justify-between">
          <span className="text-green-600">{traits.health}</span>
          <span className="text-yellow-600">{traits.stamina}</span>
          <span className="text-red-600">{traits.strength}</span>
        </div>
        <h2 className="card-title truncate text-white">{title}</h2>
        <p className="truncate text-neutral-light">{description}</p>
      </div>
    </div>
  );
};

export default BattleCard;
