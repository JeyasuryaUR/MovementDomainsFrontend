import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface BuyDomainStep3Props {
  domain: string;
  onClose: () => void;
  onNextStep: () => void;
  onDomainRegister: () => Promise<number>;
  domainRegistrationStatus: number;
}

const BuyDomainStep3: React.FC<BuyDomainStep3Props> = ({
  domain,
  onClose,
  onNextStep,
  onDomainRegister,
  domainRegistrationStatus,
}) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft === 0) {
      alert("Time expired");
      // onClose();
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, domain]);

  const handleRegister = async () => {
    try {
      const status = await onDomainRegister();
      // onNextStep();
      await console.log(status);
      if (status === 100) {
        toast.success("Domain is registered!");
        onNextStep();
      } else {
        // alert("Domain registration failed");
        toast.error("Domain registration failed");
      } 
    } catch (error) {
      console.error(error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <section className="flex overflow-hidden relative z-10 flex-col p-5 mt-0 mb-0 max-w-full bg-white rounded-xl border border-solid shadow-xl border-zinc-100">
        <header className="flex flex-wrap gap-10 justify-between items-center px-6 py-4 w-full bg-white">
          <h1 className="overflow-hidden gap-1 self-stretch my-auto text-2xl font-medium leading-none text-black text-opacity-80">
            Confirm Details
          </h1>
          <button onClick={onClose}>
            <IoCloseOutline className="text-2xl rounded-full border-black text-black border-2" />
          </button>
        </header>
        <main className="flex flex-col p-4 w-full bg-white border-t border-zinc-200">
          <p className="overflow-hidden w-full text-base text-black text-opacity-80">
            Double check these details before confirming in your wallet
          </p>
          <div className="flex flex-wrap gap-10 justify-between items-center px-6 py-5 mt-2 w-full tracking-tighter leading-none bg-white rounded-lg border border-solid border-zinc-800 border-opacity-40">
            <div className="self-stretch my-auto outline-0 text-neutral-400">
              Name
            </div>
            <div className="self-stretch my-auto font-medium text-zinc-600">
              {domain}.nil
            </div>
          </div>
          <div className="flex flex-wrap gap-10 justify-between items-center px-6 py-5 mt-2 w-full tracking-tighter leading-none bg-white rounded-lg border border-solid border-zinc-800 border-opacity-40">
            <div className="self-stretch my-auto text-neutral-400 outline-0">
              Time Left
            </div>
            <div className="self-stretch my-auto font-medium text-zinc-600">
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="flex flex-wrap gap-10 justify-between items-center px-6 py-5 mt-2 w-full tracking-tighter leading-none bg-white rounded-lg border border-solid border-zinc-800 border-opacity-40">
            <div className="self-stretch my-auto text-neutral-400 outline-0">
              Info
            </div>
            <div className="self-stretch my-auto font-medium text-zinc-600">
              Complete the purchase before the timer runs out.
            </div>
          </div>
                    <button
            className={`flex overflow-hidden flex-wrap gap-4 justify-center items-center px-7 py-3 mt-4 w-full text-xl leading-loose text-center text-white rounded shadow-sm ${
              domainRegistrationStatus === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-moveyellow"
            }`}
            onClick={handleRegister}
            disabled={domainRegistrationStatus === 1}
          >
            {domainRegistrationStatus === 1 ? (
              <div className="w-5 h-5 border-4 border-t-4 border-t-yellow-500 border-gray-200 rounded-full animate-spin"></div>
            ) : (
              <>
                <span className="self-stretch my-auto">Open Wallet</span>
                <FaArrowRight />
              </>
            )}
          </button>
          {domainRegistrationStatus === 1 && (
            <p className="mt-4 text-center text-yellow-500">
              Registering Domain...
            </p>
          )}
          {domainRegistrationStatus === 100 && (
            <p className="mt-4 text-center text-green-500">
              Domain is registered!
            </p>
          )}
          {domainRegistrationStatus === -1 && (
            <p className="mt-4 text-center text-red-500">
              Domain registration failed!
            </p>
          )}
        </main>
      </section>
    </>
  );
};

export default BuyDomainStep3;
