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

const InitiativeList: FC = () => {
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

  // if (isConnected)
  //   return (
  //     <>
  //       <div>
  //         Connected to {ensName ?? address}. with balance: {data?.formatted}
  //         .connected to {chain?.name},with provider: {provider.network.name},
  //       </div>
  //     </>
  //   );
  return <button onClick={() => connect()}>Connect Wallet</button>;
};

export default InitiativeList;
