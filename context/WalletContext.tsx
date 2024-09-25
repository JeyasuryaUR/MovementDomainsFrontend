import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { connectWallet, getWalletAddress } from "@/contracts/contract";
import { toast } from "react-toastify";

interface WalletContextProps {
  isWalletConnected: boolean;
  walletAddress: string | null;
  updateWalletConnection: () => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const updateWalletConnection = async () => {
    const address = await getWalletAddress();
    if (address) {
      setWalletAddress(address);
      setIsWalletConnected(true);
    } else {
      const signer = await connectWallet();
      const address = await signer.getAddress();
      setWalletAddress(address);
      setIsWalletConnected(true);
    }
  };

  // useEffect(() => {
  //   updateWalletConnection();
  // }, []);

  useEffect(() => {
    if (isWalletConnected) {
      toast.success("Wallet connected successfully");
    } else {
      toast.error("Please connect your wallet.");
    }
  }, [isWalletConnected]);

  return (
    <WalletContext.Provider value={{ isWalletConnected, walletAddress, updateWalletConnection }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};