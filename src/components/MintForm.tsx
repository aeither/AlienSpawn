"use client";

import type { FC } from "react";

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
  name: string;
  setName: any;
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
  name,
  setName,
}) => {
  return (
    <div className="border-md rounded-md border border-neutral-medium p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <label htmlFor="" className="text-xl text-neutral-light">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Alien Z"
            value={name}
            onChange={(e) => {
              console.log(e.target.value);
              setName(e.target.value);
            }}
            className="input w-full max-w-xs bg-neutral-regular text-neutral-light"
          />
        </div>
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
        <input type="submit" value="Mint" className="btn-primary btn" />
      </form>
    </div>
  );
};

export default MintForm;
