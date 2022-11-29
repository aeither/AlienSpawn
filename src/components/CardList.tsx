"use client";

import type { FC } from "react";
import type { CardProps } from "./Card";
import Card from "./Card";
import SkeletonCards from "./SkeletonCards";

const CardList: FC = () => {
  return (
    <div>
      <div className="flex w-full flex-col pb-8">
        <h2 className="text-xl font-bold text-white">Title</h2>
        <p className="text-neutral-light">Description</p>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {/* {!isLoading && nfts ? (
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
