import { useWallet } from "@/context/WalletContext";
import { connectWallet } from "@/contracts/contract";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { BiWallet } from "react-icons/bi";
import { FaUserCircle, FaChevronDown, FaWallet } from "react-icons/fa";

const UserMenu: React.FC = () => {
  // const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { walletAddress, updateWalletConnection } = useWallet();

  const handleConnectWallet = async () => {
    try {
      await updateWalletConnection();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-3)}`;
  };

  // useEffect(() => {
  //   // Fetch user domains
  //   const fetchUserDomains = async () => {
  //     if (walletAddress) {
  //       const domains = await getDomainsOwnedByUser(walletAddress);
  //       console.log(`Domains owned by user ${walletAddress}: ${domains}`);
  //     }
  //   };

  //   fetchUserDomains();
  // }, [walletAddress]);

  return (
    <button
      onClick={handleConnectWallet}
      className="flex flex-col px-2.5 max-md:px-1 my-auto text-lg max-md:text-sm font-medium whitespace-nowrap bg-moveyellow rounded border border-gray-300 text-zinc-50"
    >
      <div className="flex gap-2 items-center py-2 px-2.5 rounded-2xl">
        <BiWallet className="text-white w-[24px] h-[24px]" />
        <div className=" flex-1 my-auto">
          {walletAddress ? formatAddress(walletAddress) : "Connect Wallet"}
        </div>
        {/* <FaChevronDown className=" text-white w-4 h-4" /> */}
      </div>
    </button>
  );
};

export default UserMenu;