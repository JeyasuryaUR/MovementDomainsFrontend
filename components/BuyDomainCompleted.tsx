import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight, FaTimesCircle } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import PriceItem from "./PriceItem";

interface BuyDomainCompletedProps {
  domain: string;
  priceItems: { label: string; price: string; isTotal?: boolean }[];
  txLink: string | null;
}

const BuyDomainCompleted: React.FC<BuyDomainCompletedProps> = ({
  domain,
  priceItems,
  txLink,
}) => {
  return (
    <>
      <section className="flex flex-col relative z-10 p-4 md:p-7 mt-0 mb-0 bg-white rounded-xl shadow-xl">
        <div className="flex flex-col w-full tracking-tighter">
          <div className="flex flex-col justify-center p-3.5 text-white">
            <div className="flex flex-col px-4 md:px-6 pt-4 pb-8 md:pb-16 bg-moveyellow rounded-md">
              <div className="flex flex-col">
                <div className="flex flex-wrap gap-4 md:gap-10 justify-between items-center text-xl md:text-2xl font-medium leading-none whitespace-nowrap">
                  <Image
                    src="/logo2.svg"
                    alt="Name Profile"
                    width={50}
                    height={50}
                  />
                  <div className="self-stretch my-auto">{domain}.move</div>
                </div>
                <div className="flex flex-col justify-center mt-4 md:mt-8">
                  <div className="flex flex-col leading-none">
                    <h1 className="text-xl md:text-2xl font-bold">
                      Congratulations!
                    </h1>
                    
                    <h2 className="mt-2 text-xl md:text-2xl font-medium">
                      You are now the owner of{" "}
                      <span className="italic font-bold">{domain}.move</span>
                    </h2>
                  </div>
                  <p className="mt-4 text-sm md:text-md flex text-wrap text-clip">
                    Your name was successfully registered. You can now view and
                    manage your name.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="flex flex-col justify-center self-center p-3.5 w-full px-12 -mt-12 md:-mt-16 text-lg md:text-xl font-medium text-zinc-800">
          <div className="flex flex-col justify-between p-4 md:p-6 w-full bg-white rounded-md border border-solid border-zinc-800 border-opacity-40">
            {priceItems.map((item, index) => (
              <PriceItem
                key={index}
                label={item.label}
                price={item.price}
                isTotal={item.isTotal}
              />
            ))}
          </div>
        </section>
        {txLink && (
          <div className="flex justify-center p-3.5 ">
            <a
              href={txLink}
              target="_blank"
              rel="noreferrer"
              className="flex gap-2 justify-center items-center px-7 py-3 text-xl font-medium text-white bg-moveyellow rounded shadow-sm"
            >
              <span className="self-stretch my-auto">View transaction</span>
              <FaArrowRight />
            </a>
          </div>
        )}
        <div className="flex flex-wrap gap-3 md:gap-5 justify-center items-center pt-4 mt-2 text-sm md:text-md font-medium tracking-tighter border-t border-zinc-200">
          <Link
            href="/"
            className="flex gap-3.5 self-stretch px-4 py-2 md:px-6 md:py-3 my-auto text-moveyellow rounded bg-moveyellow bg-opacity-10"
          >
            Register another
          </Link>
          <Link
            href={`/mydomains/${domain}`}
            className="flex gap-3.5 self-stretch px-4 py-2 md:px-6 md:py-3 my-auto text-white bg-moveyellow rounded"
          >
            View name
          </Link>
        </div>
      </section>
    </>
  );
};

export default BuyDomainCompleted;