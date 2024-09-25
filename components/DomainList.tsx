import React, { useEffect, useState } from "react";
import DomainListingCard from "./DomainListingCard";
import nameProfile from "@/assets/icons/nameProfile.svg";
import { FaAngleDown, FaAngleUp, FaSearch } from "react-icons/fa";
import { CgMaximizeAlt } from "react-icons/cg";
import {
  getDomainExpiryDate,
  getDomainPrice,
  getDomainsByAddress,
  getWalletAddress,
} from "@/contracts/contract";
import { useWallet } from "@/context/WalletContext";

interface Domain {
  name: string;
  expiryTime: string;
  imageUrl: any;
}

const DomainList: React.FC = () => {
  const { walletAddress } = useWallet();
  const [domainObjects, setDomainObjects] = useState<Domain[]>([]);

  useEffect(() => {
    // Fetch user domains
    const fetchUserDomains = async () => {
      if (walletAddress) {
        const domains = await getDomainsByAddress();
        if (domains) {
          const domainObjects = await Promise.all(
            domains.map(async (domain: string) => {
              const expiryTime = await getDomainExpiryDate(domain);
              const expiryDate = expiryTime
                ? new Date(expiryTime.toNumber() * 1000).toLocaleString()
                : "Permanent";
              return {
                name: domain,
                expiryTime: expiryDate,
                imageUrl: nameProfile,
              };
            })
          );
          setDomainObjects(domainObjects);
        } else {
          console.error("getDomainsOwnedByUser did not return an array");
        }
      }
    };

    fetchUserDomains();
  }, [walletAddress]);

  return (
    <main className="flex flex-col relative mb-0 w-full md:w-fit px-4 ">
      <header className="flex flex-wrap justify-between items-center pb-2 border-b border-zinc-300">
        <div className="flex gap-2 items-center self-stretch">
          <button className="flex overflow-hidden gap-2 items-center self-stretch px-4 py-2 my-auto text-sm max-sm:text-xs leading-loose bg-white rounded-sm border border-solid shadow-sm border-zinc-300 text-black text-opacity-80">
            <span className="overflow-hidden self-stretch my-auto">
              Expiry date
            </span>
            <FaAngleDown />
          </button>
          <button className="flex overflow-hidden gap-2 items-center self-stretch px-4 h-full my-auto max-sm:text-xs bg-white rounded-sm border border-solid shadow-sm border-zinc-300 w-[42px]">
            <FaAngleDown />
          </button>
          <button className="flex overflow-hidden gap-2 items-center self-stretch px-4 h-full my-auto max-sm:text-xs bg-white rounded-sm border border-solid shadow-sm border-zinc-300 w-[42px]">
            <FaAngleUp />
          </button>
        </div>
        <form
          className="flex overflow-hidden h-fit my-auto bg-white rounded-sm"
          role="search"
        >
          <label htmlFor="search-input" className="sr-only">
            Search
          </label>
          <input
            id="search-input"
            type="search"
            className=" px-3.5 max-sm:w-[80%] py-1.5 text-sm leading-6 bg-white rounded-sm border-solid border border-zinc-300 text-black text-opacity-30"
            placeholder="Search"
          />
          <button
            type="submit"
            className="flex overflow-hidden gap-2.5 justify-center items-center px-3.5 py-3 h-full bg-white rounded-none shadow-sm"
          >
            <FaSearch />
          </button>
        </form>
      </header>
      <section className="flex flex-col mt-2 w-full">
        {domainObjects.map((domain, index) => (
          <DomainListingCard key={index} {...domain} />
        ))}
      </section>
      <aside className="flex gap-5 items-center max-sm:flex-col px-5 py-4 mt-8 bg-white rounded-md border border-solid border-zinc-800 border-opacity-40">
        <div className="flex justify-center items-center bg-white rounded border-zinc-200 h-fit w-1/6">
          <CgMaximizeAlt className="text-zinc-500 object-cover w-full h-full" />
        </div>
        <div className="flex flex-col text-zinc-800">
          <h3 className="text-lg tracking-tighter">
            Some names may not appear
          </h3>
          <p className="mt-1.5 text-sm tracking-tighter text-zinc-500">
            Offchain names do not currently appear in this list. You can still
            view them by searching for them directly.
            <a href="#" className="underline ml-1">
              Click to learn more
            </a>
          </p>
        </div>
      </aside>
    </main>
  );
};

export default DomainList;
