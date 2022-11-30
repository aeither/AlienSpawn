import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { useMemo } from "react";

export function useUploadIPFS() {
  const sdk = useMemo(() => new ThirdwebSDK("mainnet"), []);

  const uploadIPFS = async ({ image }: { image: File }) => {
    const uri = await sdk.storage.upload(image);
    return uri.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/");
  };

  return {
    uploadIPFS,
  };
}
