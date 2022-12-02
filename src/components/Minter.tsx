"use client";

import { FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useMintCustom } from "../hooks/alien";
import { useDomLoaded } from "../hooks/dom";
import MintForm from "./MintForm";
import { UploadIPFS } from "./UploadIPFS";

const Minter: FC = () => {
  const { domLoaded } = useDomLoaded();

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { register, handleSubmit, errors } = useForm();
  const [health, setHealth] = useState("20");
  const [stamina, setStamina] = useState("20");
  const [strength, setStrength] = useState("20");

  const assignablePoints = useMemo(() => {
    return 150 - +health - +stamina - +strength;
  }, [health, stamina, strength]);

  const onSubmit = (data) => {
    // Do something with the form data
    console.log(data);
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
  };

  if (domLoaded && isConnected)
    return (
      <>
        <UploadIPFS />
        <button className="btn-primary btn" onClick={mintCustom}>
          click me
        </button>
        <MintForm {...mintFormProps} />
      </>
    );

  return <button onClick={() => connect()}>Connect Wallet</button>;
};

export default Minter;
