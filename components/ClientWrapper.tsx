"use client";
import React from "react";
import { useWallet, WalletProvider } from "@/context/WalletContext";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  return (
    <WalletProvider>
      <InnerClientWrapper>{children}</InnerClientWrapper>
    </WalletProvider>
  );
};

const InnerClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 flex flex-col w-full">
        <Header />
        <div className="z-10">
          <div>
            {children}
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default ClientWrapper;
