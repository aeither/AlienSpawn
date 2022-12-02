"use client";

import clsx from "clsx";
import { toBlob } from "html-to-image";
import type { FC } from "react";
import { useState } from "react";
import { useCallback, useRef } from "react";
import { alien } from "../content/index";
import { useUploadIPFS } from "../hooks/upload";

interface NftImageProps {
  ipfsUrl: string | undefined;
  setIpfsUrl: any;
}

const NftImage: FC<NftImageProps> = ({ ipfsUrl, setIpfsUrl }) => {
  const [bgColor, setBgColor] = useState("bg-blue-400");
  const [pngData, setPngData] = useState<string>();
  const [characterId, setCharacterId] = useState(1);

  const ref = useRef<HTMLDivElement>(null);
  const { uploadIPFS } = useUploadIPFS();

  const convertAndUploadImage = useCallback(async () => {
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

    setBgColor(item || "cyan");
  };

  const randomCharacter = () => {
    const items = [1, 2, 3, 4, 5];
    const item = items[Math.floor(Math.random() * items.length)];

    setCharacterId(item || 1);
  };

  function setUploadedImage(event: any) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = function () {
      if (reader.result) {
        setPngData(String(reader.result));
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="border-md flex h-full flex-col justify-between rounded-md border border-neutral-medium p-12">
      <div className="flex flex-col gap-4">
        <label htmlFor="" className="text-xl text-neutral-light">
          Choose or upload
        </label>
        <input
          type={"file"}
          className="file-input w-full max-w-xs bg-neutral-regular"
          onChange={setUploadedImage}
          placeholder="upload file"
        />
      </div>
      <div className="flex w-full justify-start gap-4">
        <button onClick={randomBgColor} className="btn">
          Change Color
        </button>
        <button onClick={randomCharacter} className="btn">
          Change Character
        </button>
      </div>
      <div ref={ref} className="w-fit">
        <div className={clsx(`h-64 w-64`, `${bgColor}`)}>
          <div className="relative h-full w-full">
            <div className="absolute bottom-0 h-full w-full">
              {pngData ? (
                <div className="absolute h-full w-full">
                  <img className="bg-fill h-full w-full" src={pngData} />
                </div>
              ) : (
                alien({ alienId: characterId })
              )}
            </div>
          </div>
        </div>
      </div>
      {ipfsUrl ? (
        <p className="truncate">{ipfsUrl}</p>
      ) : (
        <button onClick={convertAndUploadImage} className="btn w-full">
          Upload
        </button>
      )}
    </div>
  );
};

export default NftImage;
