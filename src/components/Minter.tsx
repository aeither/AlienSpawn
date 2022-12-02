"use client";

import type { FC } from "react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useMintCustom } from "../hooks/alien";
import { useDomLoaded } from "../hooks/dom";
import MintForm from "./MintForm";
import NftImage from "./NftImage";
import { UploadIPFS } from "./UploadIPFS";

const Minter: FC = () => {
  const { domLoaded } = useDomLoaded();

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { register, handleSubmit } = useForm();
  const [health, setHealth] = useState("20");
  const [stamina, setStamina] = useState("20");
  const [strength, setStrength] = useState("20");
  const [name, setName] = useState("Alien X");
  const [ipfsUrl, setIpfsUrl] = useState<string>();

  const assignablePoints = useMemo(() => {
    return 150 - +health - +stamina - +strength;
  }, [health, stamina, strength]);

  const onSubmit = (data: any) => {
    // Do something with the form data
    if (assignablePoints !== 0) {
      alert("assign all points");
      return;
    } else {
      console.log(data);
    }
  };
  const { write: mint } = useMintCustom({
    recipient: address || "0x123",
    image: "ipfs://",
    name: "Alien",
    description: "Alien Spawn is a fun Evmos game",
    health: +health,
    stamina: +stamina,
    strength: +strength,
  });

  const mintCustom = async () => {
    mint && mint();
  };

  const mintFormProps = {
    onSubmit,
    assignablePoints,
    setHealth,
    setStamina,
    setStrength,
    health,
    stamina,
    strength,
    handleSubmit,
    register,
    name,
    setName,
  };

  const imageFormProps = {
    ipfsUrl,
    setIpfsUrl,
  };

  if (domLoaded && isConnected)
    return (
      <>
        <UploadIPFS />
        <button className="btn-primary btn" onClick={mintCustom}>
          click me
        </button>
        <MintForm {...mintFormProps} />
        <NftImage {...imageFormProps} />
      </>
    );

  return <button onClick={() => connect()}>Connect Wallet</button>;
};

export default Minter;
