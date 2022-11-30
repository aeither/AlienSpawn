import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
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

const Card: FC<CardProps> = ({
  title,
  description,
  image,
  traits,
  btnText,
  tokenId,
}) => {
  return (
    <div className="card w-auto rounded-md bg-neutral-regular transition duration-300 hover:ring-2 hover:ring-primary hover:ring-offset-4 hover:ring-offset-neutral-dark">
      <figure>
        <MediaRenderer src={image} alt={"nft"} />
      </figure>
      <div className="card-body">
        <div className="flex justify-between">
          <span className="text-green-600">{traits.health}</span>
          <span className="text-yellow-600">{traits.stamina}</span>
          <span className="text-red-600">{traits.strength}</span>
        </div>
        <h2 className="card-title truncate text-white">{title}</h2>
        <p className="truncate text-neutral-light">{description}</p>
        <div className="card-actions justify-end">
          <Link
            className="btn w-full bg-neutral-dark text-primary hover:border-neutral-light"
            href={`/station/${tokenId}`}
          >
            {btnText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
