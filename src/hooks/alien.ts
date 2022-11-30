import { BigNumber } from "ethers";

import { ALIEN_ABI } from "../utils/abis";
import { alienAddress } from "../utils/constants";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export type MintCustomArgs = {
  recipient: `0x${string}`;
  image: string;
  name: string;
  description: string;
  health: number;
  stamina: number;
  strength: number;
};

export type UnstakeArgs = {
  tokenId: number;
  daoVaultAddress?: `0x${string}`;
};

export const useMintCustom = ({}: MintCustomArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: alienAddress,
    abi: ALIEN_ABI,
    functionName: "safeMintCustom",
    args: [
      "0xEE465b1269F468BfBD2f3C27e8E60CccDd9200eE",
      "https://bafkreicnxxgsx6lrfg2qpxclchexvgfktrkpjff3udyqatmblrq3lkkh2q.ipfs.nftstorage.link/",
      "Mars",
      "Alien of Mars",
      BigNumber.from(80),
      BigNumber.from(80),
      BigNumber.from(80),
    ],
  });

  const { write, data, error: writeError, status } = useContractWrite(config);
  return { write, data, writeError, prepareError, status };
};
