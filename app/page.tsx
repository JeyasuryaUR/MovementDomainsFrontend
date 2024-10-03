"use client";

import { TaglineComponent } from "@/components/Tagline";
import { MintTagline } from "@/components/MintTagline";
import FeaturesComponent from "@/components/FeaturesComponent";
import SearchForm from "@/components/SearchForm";
import Image from "next/image";
import heroImg from "@/assets/images/heroImg.png";
import bottomRightArrow from '@/assets/icons/bottomRightArrow.svg';

export default function Home() {
  return (
    <main>
      <div className="container mx-auto  px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-start items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full p-4 md:p-6 lg:p-8">
        <div className="md:ml-64 z-10">
          <TaglineComponent />
          <div className="container w-full flex flex-row justify-between gap-2 max-lg:justify-center max-lg:items-center max-lg:flex-col mt-4 sm:mt-0 z-10">
            <div className="lg:ml-16">
              <div className="flex md:pt-12 flex-col justify-center items-center md:items-start md:justify-start w-full  mx-auto">
                <SearchForm />
                <Image
                  loading="lazy"
                  src={bottomRightArrow}
                  alt="Bottom Right Arrow"
                  layout="intrinsic"
                  width={50}
                  height={50}
                  className="object-contain flex mt-4 md:mt-8 lg:mt-16 lg:ml-24 md:ml-10 "
                  style={{ transform: "rotate(-90deg)" }}
                />
              </div>
            </div>
            <div className="flex flex-col max-lg:mt-6 max-lg:justify-center max-lg:items-center">
              <div className="flex">
                <MintTagline />
              </div>
              <div className="flex">
                <FeaturesComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute pointer-events-none w-fit bottom-0 z-0 left-0 md:pt-96 md:pr-96">
        <Image
          src={heroImg}
          alt="Hero Image"
          className="pr-40 lg:pr-64"
        />
      </div>
    </main>
  );
}
