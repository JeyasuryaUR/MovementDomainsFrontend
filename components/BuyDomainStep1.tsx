import { LuCopy } from "react-icons/lu";
import PriceItem from "@/components/PriceItem";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import gweiIcom from "@/assets/icons/gwei.svg";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import React from "react";

interface BuyDomainStep1Props {
  domain: string;
  currency: string;
  setCurrency: (currency: string) => void;
  priceItems: { label: string; price: string; isTotal?: boolean }[];
  onNextStep: () => void;
  year: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const BuyDomainStep1: React.FC<BuyDomainStep1Props> = ({
  domain,
  currency,
  setCurrency,
  priceItems,
  onNextStep,
  year,
  onIncrement,
  onDecrement,
}) => {
  return (
    <>
      <section className="flex w-full justify-start p-1 mb-2">
        <div className="flex gap-3 items-center text-xl font-bold text-black">
          <span>{domain}.move</span>
          <LuCopy />
        </div>
      </section>

      <section className="flex w-full justify-center items-center">
        <div className="flex relative flex-col items-center pt-2 w-full bg-blend-luminosity ">
          <section className="flex relative flex-col w-full p-6 mb-0 bg-white rounded-xl shadow-xl ">
            <h1 className="gap-2 self-stretch p-2 w-full text-3xl font-bold tracking-tighter leading-none text-zinc-800">
              Register{" "}
              <span className="relative">
                <span>{domain}.move</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-moveyellow rounded-full"></span>
              </span>
            </h1>
            <div className="flex z-0 justify-center flex-col mt-6 w-full tracking-tighter leading-none">
              <div className="flex flex-wrap gap-10 justify-between items-center p-6 w-full text-3xl max-md:text-xl max-md:gap-4 font-medium text-yellow-600 bg-white rounded-lg border border-solid border-zinc-800 border-opacity-40">
                <BiMinusCircle
                  width={45}
                  height={45}
                  className={`${year <= 1 ? "opacity-50 text-slate-500 cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={onDecrement}
                />
                <span className="self-stretch my-auto">{year} year{year > 1 ? "s" : ""}</span>
                <BiPlusCircle
                  width={45}
                  height={45}
                  className={`${year >= 5 ? "opacity-50 text-slate-500 cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={onIncrement}
                />
              </div>
              <p className="justify-center flex mt-1.5 w-full text-base text-moveyellow">
                <span className="text-zinc-800 mr-1">{year} year registration.</span>
                pick by date
              </p>
            </div>
            <div className="flex z-0 flex-col mt-6 w-full ">
              <div className="flex flex-wrap gap-10 justify-between items-end w-full ">
                <div className="flex relative text-base tracking-tighter text-zinc-500">
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
                        currency === "APT"
                          ? "text-white bg-moveyellow shadow-md"
                          : "text-black text-opacity-70"
                      }`}
                      onClick={() => setCurrency("APT")}
                    >
                      APT
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
              <div className="flex flex-col justify-center px-5  py-2 mt-3.5 w-full text-base font-medium rounded-sm bg-neutral-100 text-neutral-400">
                {priceItems.map((item, index) => (
                  <PriceItem
                    key={index}
                    label={item.label}
                    price={item.price}
                    isTotal={item.isTotal}
                  />
                ))}
              </div>
            </div>
            <button
              className="w-full bg-moveyellow mt-4 py-2 rounded-sm text-white flex items-center justify-center"
              onClick={onNextStep}
            >
              Pay Now
              <FaArrowRight className="ml-2" />
            </button>
          </section>
        </div>
      </section>
    </>
  );
};

export default BuyDomainStep1;