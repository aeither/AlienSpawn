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

const Minter: FC = () => {
  const { domLoaded } = useDomLoaded();

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { register, handleSubmit } = useForm();
  const [health, setHealth] = useState("60");
  const [stamina, setStamina] = useState("40");
  const [strength, setStrength] = useState("50");
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
      mintCustom();
    }
  };
  const { write: mint } = useMintCustom({
    recipient: address || "0x123",
    image:
      ipfsUrl ||
      "https://gateway.ipfscdn.io/ipfs/Qmcc6mA7CUpJUGfAMGxrnajHhLYtKTg4oLLUmHYhQDczkM/alien.png",
    name: name,
    description: "Alien Spawn is a fun game on Evmos",
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
        <div className="grid w-full grid-cols-2 gap-12">
          <div>
            <NftImage {...imageFormProps} />
          </div>
          <div>
            <MintForm {...mintFormProps} />
          </div>
        </div>
      </>
    );

  return <button onClick={() => connect()}>Connect Wallet</button>;
};

export default Minter;
