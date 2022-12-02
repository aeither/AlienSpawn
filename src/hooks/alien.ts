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

export const useMintCustom = ({
  recipient,
  image,
  name,
  description,
  health,
  stamina,
  strength,
}: MintCustomArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: alienAddress,
    abi: ALIEN_ABI,
    functionName: "safeMintCustom",
    args: [
      recipient,
      // "https://bafkreicnxxgsx6lrfg2qpxclchexvgfktrkpjff3udyqatmblrq3lkkh2q.ipfs.nftstorage.link/",
      image,
      name,
      description,
      BigNumber.from(health * 2),
      BigNumber.from(stamina),
      BigNumber.from(strength),
    ],
  });

  const { write, data, error: writeError, status } = useContractWrite(config);
  return { write, data, writeError, prepareError, status };
};
