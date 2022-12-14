import { ThirdwebProvider } from "@thirdweb-dev/react";
import { type AppType } from "next/dist/shared/lib/utils";
import type { Chain } from "wagmi";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import NextHead from "../components/NextHead";
import "../styles/globals.css";
import { RPC_URL, CHAIN_ID } from "../utils/constants";

const evmosTestnet: Chain = {
  id: CHAIN_ID,
  name: "Evmos Testnet",
  network: "test evmos",
  nativeCurrency: { name: "Test Evmos", symbol: "TEVMOS", decimals: 18 },
  rpcUrls: {
    default: RPC_URL,
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [evmosTestnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: RPC_URL,
      }),
    }),
  ]
);

const client = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ThirdwebProvider desiredChainId={undefined}>
        <WagmiConfig client={client}>
          <NextHead />
          <Component {...pageProps} />
        </WagmiConfig>
      </ThirdwebProvider>
    </>
  );
};

export default MyApp;
