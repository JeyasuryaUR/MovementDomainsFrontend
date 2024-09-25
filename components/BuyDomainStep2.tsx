import { LuCopy } from "react-icons/lu";
import PriceItem from "@/components/PriceItem";
import gweiIcom from "@/assets/icons/gwei.svg";
import Image from "next/image";
import React from "react";

interface StepData {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

const stepData: StepData[] = [
  {
    number: 1,
    title: "Complete a",
    description: "transaction to begin the timer",
  },
  {
    number: 2,
    title: "Wait 60 seconds",
    description: "This for the timer to complete",
  },
  {
    number: 3,
    title: "Complete a",
    description: "Second transaction to secure your name",
    isLast: true,
  },
];

interface BuyDomainStep2Props {
  domain: string;
  currency: string;
  setCurrency: (currency: string) => void;
  priceItems: { label: string; price: string; isTotal?: boolean }[];
  onNextStep: () => void;
}

const BuyDomainStep2: React.FC<BuyDomainStep2Props> = ({
  domain,
  currency,
  setCurrency,
  priceItems,
  onNextStep,
}) => {
  return (
    <>
      <section className="flex w-full justify-start p-1 mb-2">
        <div className="flex gap-3 items-center text-xl font-bold text-black">
          <span>{domain}.nil</span>
          <LuCopy />
        </div>
      </section>

      <section className="flex w-full justify-center items-center">
        <div className="flex relative flex-col items-center pt-2 w-full bg-blend-luminosity ">
          <section className="flex relative flex-col w-full p-6 mb-0 bg-white rounded-xl shadow-xl">
            <div className="gap-2 self-center p-2 flex flex-col w-fit leading-none text-zinc-800">
              <h1 className="text-3xl px-3 flex w-fit self-center font-bold tracking-tighter relative">
                Before we start
                <span className="absolute bottom-0 left-0 w-full h-1 bg-moveyellow rounded-full"></span>
              </h1>
              <p className="text-base">
                Registering your name takes three steps.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center items-center mt-4 w-full">
              {stepData.map((step, index) => (
                <article
                  key={index}
                  className="flex flex-col flex-1 justify-center"
                >
                  <div className="flex gap-2 items-center w-full text-sm">
                    <div className="flex justify-center items-center w-8 h-8 bg-moveyellow border border-moveyellow rounded-full text-white">
                      {step.number}
                    </div>
                    <div className="text-black  text-opacity-80">
                      {step.title}
                    </div>
                    {!step.isLast && (
                      <div className="flex-grow h-[0.5px] bg-slate-500"></div>
                    )}
                  </div>
                  <div className="pl-10 max-w-50 text-xs leading-6 text-black text-opacity-80">
                    {/* {step.description.split("<br />").map((line, index) => (
                      <span key={index}>
                        {line}
                        {index <
                          step.description.split("<br />").length - 1 && <br />}
                      </span>
                    ))} */}
                    <span className="">{step.description}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex z-0 flex-col mt-6 w-full ">
              <div className="flex flex-wrap gap-10 justify-between items-end w-full ">
                <div className="flex relative text-base tracking-tighter text-zinc-500 ">
                  <Image
                    src={gweiIcom}
                    alt="Gwei Icon"
                    width={24}
                    height={24}
                  />
                  <span>10.9 Gwei</span>
                </div>
                <div className="flex items-start text-lg font-medium rounded">
                  <div className="flex items-center py-1 px-1 rounded bg-slate-200">
                    <button
                      className={`self-stretch px-3 py-1 my-auto rounded ${
                        currency === "ETH"
                          ? "text-white bg-moveyellow shadow-md"
                          : "text-black text-opacity-70"
                      }`}
                      onClick={() => setCurrency("ETH")}
                    >
                      ETH
                    </button>
                    <button
                      className={`self-stretch py-1 px-3 my-auto rounded ${
                        currency === "USD"
                          ? "text-white bg-moveyellow shadow-md"
                          : "text-black text-opacity-70"
                      }`}
                      onClick={() => setCurrency("USD")}
                    >
                      USD
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center px-5 py-2 mt-3.5 w-full text-base font-medium rounded-sm bg-neutral-100 text-neutral-400">
                {priceItems.map((item, index) => (
                  <PriceItem
                    key={index}
                    label={item.label}
                    price={item.price}
                    isTotal={item.isTotal}
                  />
                ))}
              </div>
              <p className="justify-center flex mt-4 mb-2 w-full text-base text-moveyellow">
                <span className="text-zinc-800 mr-1">1 year registration.</span>
                pick by date
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 mt-2.5 w-full text-md border-t border-zinc-200">
              <button className="gap-2 self-stretch py-2 px-4 my-auto text-moveyellow rounded-sm bg-yellow-100 " onClick={onNextStep}>
                Verification
              </button>
              <button className="gap-2 self-stretch py-2 px-4 my-auto text-white bg-moveyellow rounded-sm">
                Edit profile
              </button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default BuyDomainStep2;
