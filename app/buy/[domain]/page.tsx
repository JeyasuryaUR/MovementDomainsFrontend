"use client";
import bg1 from "@/assets/images/bg1.png";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import BuyDomainStep1 from "@/components/BuyDomainStep1";
import BuyDomainStep2 from "@/components/BuyDomainStep2";
import BuyDomainStep3 from "@/components/BuyDomainStep3";
import BuyDomainCompleted from "@/components/BuyDomainCompleted";
import { registerDomain } from "@/entry-functions/registerDomain";
import { getDomainPrice } from "@/view-functions/getDomainPrice";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toast } from "react-toastify";
import { aptosClient } from "@/utils/aptosClient";

const BuyPage = () => {
  const { connected, account, signAndSubmitTransaction } = useWallet();
  const isWalletConnected = connected && account;

  const params = useParams();
  const domain = Array.isArray(params.domain)
    ? params.domain[0]
    : params.domain;

  const [currency, setCurrency] = useState("APT");
  const [currentStep, setCurrentStep] = useState(1);
  const [year, setYear] = useState(1);
  const [txLink, setTxLink] = useState<string | null>(null);
  const [priceItems, setPriceItems] = useState([
    { label: `Yearly registration fee`, price: "NULL" },
    { label: "Est. network fee", price: "NULL" },
    { label: "Estimated total", price: "Loading...", isTotal: true },
  ]);

  const [status, setStatus] = useState<number>(0); // State to store the status message

  const handleRegister = async (): Promise<number> => {
    try {

      if (!isWalletConnected){
        toast.error("Please connect your wallet");
      }
      setStatus(1); // Registering domain


      console.log("Registering domain:", domain);
      console.log("Registration duration:", year, "year(s)");


      const committedTransaction = await signAndSubmitTransaction(
        registerDomain({
          domain_name: domain,
          registration_duration_secs: year * 31536000, // 1 year in seconds
        }),
      );


      console.log("Committed transaction:", committedTransaction);
       // Connecting wallet & Registering domain
       const transactionLink = `https://explorer.aptoslabs.com/txn/${committedTransaction.hash}?network=testnet`;
      console.log("Transaction link:", transactionLink);
      const executedTransaction = await aptosClient().waitForTransaction({
        transactionHash: committedTransaction.hash,
      }); 
      console.log("Executed transaction:", executedTransaction);
      console.log("Executed transaction hash:", executedTransaction.hash);
      
      setTxLink(transactionLink);
      setStatus(100); // Domain registered successfully
      return 100;
    } catch (error) {
      console.error(error);
      // Check if error is an instance of Error
      if (error instanceof Error) {
        // Toast the first 50 characters of the error message
        toast.error(error.message.substring(0, 50));
      } else {
        // Handle the case where error is not an instance of Error
        toast.error("An unknown error occurred");
      }
      setStatus(-1); // Error registering domain
      return -1;
    }
    // return status;
  };

  useEffect(() => {
    const fetchDomainPrice = async () => {
      try {
        console.log("Fetching domain price for:", domain, year, "year(s)");
        
        const octaPrice = await getDomainPrice({
          domain_length: domain.length,
          registration_secs: year * 31536000,
        });

        const price = octaPrice / 100_000_000;

        console.log("Domain price:", price);
        if (!price) {
          throw new Error("Price is undefined");
        }
        
        setPriceItems((prevItems) => [
          prevItems[0],
          prevItems[1],
          { ...prevItems[2], price: price.toString() },
        ]);
      } catch (error) {
        console.error("Error fetching domain price:", error);
      }
    };

    fetchDomainPrice();
  }, [domain, year]);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleClose = () => {
    setCurrentStep(1);
  };

  const handleIncrement = () => {
    setYear(year + 1);
  };

  const handleDecrement = () => {
    if (year > 1) {
      setYear(year - 1);
    }
  };

  return (
    <main
      className={`container py-2 flex flex-col h-full items-center
        ${isWalletConnected ? "" : "opacity-50 pointer-events-none"}`}
    >
      <div className="w-[60vw]">
        {currentStep === 1 && (
          <BuyDomainStep1
            domain={domain}
            currency={currency}
            setCurrency={setCurrency}
            priceItems={priceItems}
            onNextStep={handleNextStep}
            year={year}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        )}
        {/* {currentStep === 2 && (
          <BuyDomainStep2
            domain={domain}
            currency={currency}
            setCurrency={setCurrency}
            priceItems={priceItems}
            onNextStep={handleNextStep}
          />
        )} */}
        {currentStep === 2 && (
          <BuyDomainStep3
            domain={domain}
            onClose={handleClose}
            onNextStep={handleNextStep}
            onDomainRegister={handleRegister}
            domainRegistrationStatus={status}
          />
        )}
        {currentStep === 3 && (
          <BuyDomainCompleted
            domain={domain}
            priceItems={priceItems}
            txLink={txLink}
          />
        )}
      </div>
    </main>
  );
};

export default BuyPage;
