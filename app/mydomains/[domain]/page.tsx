"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiLink } from "react-icons/bi";
import DomainHeader from "@/components/DomainHeader";
import nameBanner from "@/assets/images/nameBanner.png";
import nameProfile from "@/assets/icons/nameProfile.svg";
import Image from "next/image";
import { FaEllipsisVertical, FaEthereum } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { LuCopy } from "react-icons/lu";
import bg1 from "@/assets/images/bg1.png";
import {
  getDomainExpiryDate,
  getDomainsByAddress,
  getWalletAddress,
} from "@/contracts/contract";
import { useWallet } from "@/context/WalletContext";

type TabProps = {
  label: string;
  isActive?: boolean;
};

const Tab: React.FC<TabProps> = ({ label, isActive = false }) => (
  <div
    className={`flex overflow-hidden items-center py-1 px-3 my-auto rounded-sm ${
      isActive ? "text-yellow-600 bg-yellow-100" : "bg-neutral-100 bg-opacity-0"
    } shadow-[0px_2px_0px_rgba(0,0,0,0.016)]`}
  >
    <div className="overflow-hidden">{label}</div>
  </div>
);

const NamePage = () => {
  const router = useRouter();
  const params = useParams();
  const domain = Array.isArray(params.domain)
    ? params.domain[0]
    : params.domain;
  const [expiryTime, setExpiryTime] = useState<string | null>("Loading...");

  const tabs = [
    "Profile",
    // "Records",
    // "Ownership",
    // "Surnames",
    // "Permissions",
    // "More",
  ];

  const { walletAddress } = useWallet();
  // const [domains, setDomains] = useState<string[]>([]);

  // useEffect(() => {
  //   // Fetch user domains
  //   const fetchUserDomains = async () => {
  //     const domains = await getDomainsByAddress();
  //     setDomains(domains);
  //   };

  //   fetchUserDomains();
  // }, [walletAddress]);

  useEffect(() => {
    if (!domain) {
      // Handle the case where the domain is not available
      router.push("/mydomains");
    }
  }, [domain, router]);

  useEffect(() => {
    const fetchExpiryTime = async () => {
      const expiryTime = await getDomainExpiryDate(domain);
      const expiryDate = expiryTime
        ? new Date(expiryTime.toNumber() * 1000).toLocaleString()
        : "Permanent";
      setExpiryTime(expiryDate);
    };

    fetchExpiryTime();
  }, [domain, walletAddress]);

  return (
    <main className="py-2 flex flex-col justify-center items-center h-full">
      <div className="w-full md:w-[60vw] px-4 md:px-0">
        <section className="flex w-full justify-between p-1 mb-2">
          <div className="flex gap-3 items-center text-xl font-bold text-black">
            <span>{domain}</span>
            <LuCopy />
          </div>
          <div className="flex gap-1.5 items-center text-md font-medium text-moveyellow">
            <BiLink />
            <span>Etherscan</span>
          </div>
        </section>

        <section className="flex w-full justify-center items-center">
          <div className="flex relative w-full flex-col mb-0">
            <nav className="flex gap-4 md:gap-10 items-center pb-2 text-base leading-loose whitespace-nowrap border-b border-zinc-300 text-black text-opacity-30">
              <div className="flex justify-between w-full gap-4 items-center mx-1 my-auto">
                {tabs.map((tab, index) => (
                  <Tab key={tab} label={tab} isActive={index === 0} />
                ))}
              </div>
            </nav>

            <section className="flex overflow-hidden gap-2.5 items-center mt-5 bg-white leading-none rounded-xl shadow-xl">
              <div className="relative flex flex-col rounded-[35px] w-full">
                <div className="relative flex">
                  <Image
                    loading="lazy"
                    src={nameBanner}
                    className="object-cover object-right w-full max-h-32 aspect-5"
                    alt="Profile banner"
                  />

                  <div className="absolute left-6 -bottom-8 w-[60px] h-[60px] bg-white rounded-full border-4 border-white overflow-hidden">
                    <Image
                      loading="lazy"
                      src={nameProfile}
                      className="object-cover w-full h-full"
                      alt="Profile logo"
                    />
                  </div>

                  <button className="absolute right-6 text-xs -bottom-10 px-4 py-2 text-moveyellow rounded-sm bg-yellow-100">
                    Extend
                  </button>
                </div>
                <div className="flex overflow-hidden flex-col px-6 py-4 w-full bg-white mt-6">
                  <DomainHeader domain={domain} />
                </div>
              </div>
            </section>

            <section className="flex overflow-hidden justify-center p-5 mt-4 w-full font-medium bg-white leading-none rounded-xl shadow-xl">
              <div className="flex flex-col w-full">
                <div className="flex flex-col py-2 text-sm leading-loose">
                  <div className="flex relative flex-col items-start text-black">
                    <div className="opacity-60">Addresses</div>
                    <div className="flex overflow-hidden gap-2 justify-center items-center px-4 py-1.5 mt-2.5 bg-white rounded-sm border border-solid shadow-sm border-zinc-300">
                      <FaEthereum />
                      <div className="self-stretch my-auto">
                        {walletAddress ? walletAddress : "Loading..."}
                      </div>
                      <FaEllipsisVertical />
                    </div>
                  </div>
                  <div className="flex flex-col mt-5 w-full">
                    <div className="flex relative gap-2 max-w-full whitespace-nowrap text-black items-center">
                      <div className="relative opacity-60">Ownership</div>
                      <div className="flex items-center gap-1">
                        <FaArrowRight className="text-moveyellow" />
                        <div className="relative text-moveyellow">View</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2.5 items-center mt-2.5 w-full text-black text-opacity-80">
                      <div className="flex overflow-hidden gap-2 justify-center items-center self-stretch px-2 py-1 my-auto bg-white rounded-sm border border-solid shadow-sm border-zinc-300">
                        <div className="self-stretch my-auto opacity-50">
                          owner
                        </div>
                        <div className="self-stretch my-auto">
                          {walletAddress ? walletAddress : "Loading..."}
                        </div>
                        <FaEllipsisVertical />
                      </div>
                      <div className="flex overflow-hidden gap-2 justify-center items-center self-stretch px-2 py-1 my-auto bg-white rounded-sm border border-solid shadow-sm border-zinc-300">
                        <div className="self-stretch my-auto opacity-50">
                          expiry
                        </div>
                        <div className="self-stretch my-auto">{expiryTime}</div>
                        <LuCopy />
                      </div>
                      <div className="flex overflow-hidden gap-2 justify-center items-center self-stretch px-2 py-1 my-auto whitespace-nowrap bg-white rounded-sm border border-solid shadow-sm border-zinc-300">
                        <div className="self-stretch my-auto opacity-50">
                          parent
                        </div>
                        <div className="self-stretch my-auto">nil</div>
                        <FaEllipsisVertical />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-end items-center pt-2 mt-2.5 w-full text-xs tracking-tight border-t border-zinc-200">
                  <button className="gap-2 self-stretch py-2 px-4 my-auto text-moveyellow rounded-sm bg-yellow-100">
                    Verification
                  </button>
                  <button className="gap-2 self-stretch py-2 px-4 my-auto text-white bg-moveyellow rounded-sm">
                    Edit profile
                  </button>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
};

export default NamePage;
