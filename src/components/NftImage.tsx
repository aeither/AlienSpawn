"use client";

import clsx from "clsx";
import { toBlob } from "html-to-image";
import type { FC } from "react";
import { useState } from "react";
import { useCallback, useRef } from "react";
import SVG from "../content/alien01";
import { useUploadIPFS } from "../hooks/upload";

interface NftImageProps {
  ipfsUrl: string | undefined;
  setIpfsUrl: any;
}

const NftImage: FC<NftImageProps> = ({ ipfsUrl, setIpfsUrl }) => {
  const [bgColor, setBgColor] = useState("blue");

  const ref = useRef<HTMLDivElement>(null);
  const { uploadIPFS } = useUploadIPFS();

  const onButtonClick = useCallback(async () => {
    if (ref.current === null) {
      return;
    }

    const blob = await toBlob(ref.current, { cacheBust: true }).catch((err) => {
      console.log(err);
    });
    if (blob) {
      const file = new File([blob], "alien.png", { type: blob.type });
      const uri = await uploadIPFS({ image: file });
      console.log(uri);
      setIpfsUrl(uri);
    }
  }, [ref]);

  const randomBgColor = () => {
    const colors = [
      "bg-red-400",
      "bg-blue-400",
      "bg-green-400",
      "bg-cyan-400",
      "bg-lime-400",
      "bg-teal-400",
      "bg-fuchsia-400",
      "bg-pink-400",
    ];
    const item = colors[Math.floor(Math.random() * colors.length)];
    console.log("🚀 ~ file: NftImage.tsx:40 ~ randomBgColor ~ item", item);

    setBgColor(item || "cyan");
  };

  return (
    <>
      <button onClick={randomBgColor} className="btn">
        Change Color
      </button>
      <div ref={ref}>
        <div className={clsx(`h-64 w-64`, `${bgColor} bg-`)}>
          <div className="relative h-full w-full">
            <div className="absolute bottom-0 h-full w-full">
              <SVG />
              {/* <HairNormal color={"#1aa212"} /> */}
            </div>
          </div>
        </div>
      </div>
      {ipfsUrl ? (
        <p className="truncate">{ipfsUrl}</p>
      ) : (
        <button onClick={onButtonClick} className="btn">
          Upload
        </button>
      )}
    </>
  );
};

export default NftImage;
