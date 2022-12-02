"use client";

import { FC, useMemo, useState } from "react";
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
import { UploadIPFS } from "./UploadIPFS";

interface MintFormProps {
  onSubmit: any;
  assignablePoints: number;
  setHealth: any;
  setStamina: any;
  setStrength: any;
  health: string;
  stamina: string;
  strength: string;
  handleSubmit: any;
  register: any;
}

const MintForm: FC<MintFormProps> = ({
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
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Alien Z"
          className="input w-full max-w-xs"
        />
        <p className="text-neutral-light">
          Assignable points: {assignablePoints}
        </p>
        <div className="flex gap-4">
          <input
            type="range"
            {...register("health", { min: 20, max: 100 })}
            min="20"
            max="100"
            value={health}
            className="range range-success"
            step="5"
            onChange={(e) => {
              console.log(e.target.value);
              setHealth(e.target.value);
            }}
          />
          <span>{health}</span>
        </div>
        <div className="flex gap-4">
          <input
            type="range"
            {...register("stamina", { min: 20, max: 100 })}
            min="20"
            max="100"
            value={stamina}
            className="range range-warning"
            step="5"
            onChange={(e) => {
              console.log(e.target.value);
              setStamina(e.target.value);
            }}
          />
          <span>{stamina}</span>
        </div>
        <div className="flex gap-4">
          <input
            type="range"
            {...register("strength", { min: 20, max: 100 })}
            min="20"
            max="100"
            value={strength}
            className="range range-error"
            step="5"
            onChange={(e) => {
              console.log(e.target.value);
              setStrength(e.target.value);
            }}
          />
          <span>{strength}</span>
        </div>
        <input type="submit" className="btn-primary btn" />
      </form>
    </div>
  );
};

export default MintForm;
