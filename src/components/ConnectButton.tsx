"use client";

import { BigNumber, ethers } from "ethers";
import { FC, useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useDomLoaded } from "../hooks/dom";

const ConnectButton: FC = () => {
  const { domLoaded } = useDomLoaded();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const [balance, setBalance] = useState<string>();

  const getGotchis = async () => {
    if (!address) return;
    const response = await fetch(`/api/balance?address=${address}`)
      .then((response) => response.json())
      .catch((err) => console.error(err));

    console.log(response.data);
    console.log(response.data?.items[0].balance);
    const _balance = ethers.utils.formatEther(
      BigNumber.from(response.data?.items[0].balance)
    );

    setBalance(_balance.slice(0, 4));
  };

  useEffect(() => {
    getGotchis();
  }, [address]);

  if (domLoaded && isConnected)
    return (
      <div>
        {address?.slice(0, 4)}...{address?.slice(-4)}. {balance} TEVMOS
      </div>
    );

  return <button className="bg-primary px-2 py-1 text-neutral-dark" onClick={() => connect()}>Connect Wallet</button>;
};

export default ConnectButton;
