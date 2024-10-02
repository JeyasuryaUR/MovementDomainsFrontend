"use client"; // Required for client-side rendering
import React from "react";
import Header from "./Header"; // Assuming you have this component
import Footer from "./Footer"; // Assuming you have this component
import { WalletProvider } from "@/components/WalletProvider";
import { Toaster } from "@/components/ui/toaster";
import { WrongNetworkAlert } from "@/components/WrongNetworkAlert"; // Assuming WalletContext is set up correctly
import { ToastContainer } from "react-toastify";
 

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  return (
    <WalletProvider>
      <div className="flex flex-col bg-moveyellow relative max-w-screen min-h-screen justify-between">
        <InnerClientWrapper>{children}</InnerClientWrapper>
      </div>
    </WalletProvider>
  );
};

const InnerClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col w-full">
        {/* Children will be injected here */}
        <div className="z-10">{children}</div>
        <WrongNetworkAlert /> {/* Your network alert component */}
        <Toaster /> {/* Toast notifications */}
      </div>
      <Footer />
    </>
  );
};

export default ClientWrapper;
