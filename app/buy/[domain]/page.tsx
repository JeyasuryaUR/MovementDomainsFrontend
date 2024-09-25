"use client";
import bg1 from "@/assets/images/bg1.png";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import BuyDomainStep1 from "@/components/BuyDomainStep1";
import BuyDomainStep2 from "@/components/BuyDomainStep2";
import BuyDomainStep3 from "@/components/BuyDomainStep3";
import BuyDomainCompleted from "@/components/BuyDomainCompleted";
import { getDomainPrice, registerUserDomain } from "@/contracts/contract";
import { ethers } from "ethers";
import { useWallet } from "@/context/WalletContext";
import { toast } from "react-toastify";

const BuyPage = () => {
  const { isWalletConnected } = useWallet();

  const params = useParams();
  const domain = Array.isArray(params.domain)
    ? params.domain[0]
    : params.domain;

  const [currency, setCurrency] = useState("ETH");
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
      setStatus(1); // Connecting wallet & Registering domain
      const transactionLink = await registerUserDomain(domain, year); // Register the domain
      setTxLink(transactionLink);
      await setStatus(100); // Domain registered successfully
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
      await setStatus(-1); // Error registering domain
      return -1;
    }
    // return status;
  };

  useEffect(() => {
    const fetchDomainPrice = async () => {
      try {
        const price = (year * 0.05 * (100 - (year - 1) * 5)) / 100; //await getDomainPrice(domain, year);
        if (!price) {
          throw new Error("Price is undefined");
        }
        // const formattedPrice = `${ethers.utils.formatEther(price)} ETH`;
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
