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

export type BattleProps = {
  attackerId: string;
  opponentId: string;
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

export const useInvade = ({ attackerId, opponentId }: BattleProps) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: alienAddress,
    abi: ALIEN_ABI,
    functionName: "invade",
    args: [BigNumber.from(attackerId), BigNumber.from(opponentId)],
  });

  const { write, data, error: writeError, status } = useContractWrite(config);
  return { write, data, writeError, prepareError, status };
};
