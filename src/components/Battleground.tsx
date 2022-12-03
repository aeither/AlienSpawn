"use client";

import type { FC } from "react";
import { useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useInvade } from "../hooks/alien";
import { useDomLoaded } from "../hooks/dom";
import BattlegroundLeft from "./BattlegroundLeft";
import BattlegroundRight from "./BattlegroundRight";

const Battleground: FC = () => {
  const { domLoaded } = useDomLoaded();
  const { address, isConnected } = useAccount();
  const [attackerId, setAttackerId] = useState<string>();
  const [opponentId, setOpponentId] = useState<string>();
  const { write: invade } = useInvade({
    attackerId: attackerId || "0",
    opponentId: opponentId || "1",
  });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const battle = async () => {
    if (attackerId === undefined || opponentId === undefined) {
      alert("select battle cards on both side");
    } else {
      console.log("battle", attackerId, opponentId);
      invade && (await invade());
      alert("Winner obtain 5 Points!!!")
    }
  };

  if (domLoaded && isConnected)
    return (
      <>
        <div className="flex w-full">
          <div className="flex-1">
            <BattlegroundLeft
              attackerId={attackerId}
              setAttackerId={setAttackerId}
            />
          </div>
          <div className="grow-0 self-center">
            <button onClick={battle} className="btn-primary btn">
              Battle!
            </button>
          </div>
          <div className="flex-1">
            <BattlegroundRight
              opponentId={opponentId}
              setOpponentId={setOpponentId}
            />
          </div>
        </div>
      </>
    );

  return <button onClick={() => connect()}>Connect Wallet</button>;
};

export default Battleground;
