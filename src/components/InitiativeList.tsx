"use client";

import type { FC } from "react";
import {
  useAccount,
  useBalance,
  useConnect,
  useEnsName,
  useNetwork,
  useProvider,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useMintCustom } from "../hooks/alien";
import { useDomLoaded } from "../hooks/dom";

const InitiativeList: FC = () => {
  const { domLoaded } = useDomLoaded();

  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address: address,
  });
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { chain, chains } = useNetwork();
  const provider = useProvider();

  const { write: mint } = useMintCustom({
    recipient: address || "0x123",
    image: "ipfs://",
    name: "name",
    description: "description",
    health: 80,
    stamina: 20,
    strength: 10,
  });

  const mintCustom = async () => {
    mint && mint();
  };

  if (domLoaded && isConnected)
    return (
      <>
        <button className="btn-primary btn" onClick={mintCustom}>
          click me
        </button>
        <div>
          Connected to {ensName ?? address}. with balance: {data?.formatted}
          .connected to {chain?.name},with provider: {provider.network.name},
        </div>
      </>
    );

  return <button onClick={() => connect()}>Connect Wallet</button>;
};

export default InitiativeList;
