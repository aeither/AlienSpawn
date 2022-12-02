import React from "react";

import Alien01 from "./alien01";
import Alien02 from "./alien02";
import Alien03 from "./alien03";
import Alien04 from "./alien04";
import Alien05 from "./alien05";

export function alien(props: { alienId: number }) {
  const { alienId } = props;
  switch (alienId) {
    case 1:
      return <Alien01 />;
    case 2:
      return <Alien02 />;
    case 3:
      return <Alien03 />;
    case 4:
      return <Alien04 />;
    case 5:
      return <Alien05 />;
    default:
      return <Alien01 />;
  }
}
