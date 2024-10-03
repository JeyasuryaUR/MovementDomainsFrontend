"use client";

// Internal constants
import { NETWORK } from "@/constants";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import type { PropsWithChildren } from "react";
import { toast } from "react-toastify";

export function WalletProvider({ children }: PropsWithChildren) {

  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{ network: NETWORK }}
      onError={(error) => {
        toast.error(error || "Unknown wallet error");
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}
