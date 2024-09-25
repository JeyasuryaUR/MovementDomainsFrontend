"use client";

import { TaglineComponent } from "@/components/Tagline";
import { MintTagline } from "@/components/MintTagline";
import FeaturesComponent from "@/components/FeaturesComponent";
import SearchForm from "@/components/SearchForm";
import Image from "next/image";
import heroImg from "@/assets/images/heroImg.png";

export default function Home() {
  return (
    <main>
      <div className="container mx-auto z-10 px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-start items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full p-4 md:p-6 lg:p-8">
        <TaglineComponent />
        <div className="container w-full flex flex-row justify-end gap-2 max-lg:justify-center max-lg:items-center max-lg:flex-col mt-4 sm:mt-0 z-10">
          <div className="lg:ml-16">
            <div className="flex flex-col lg:flex-row max-lg:justify-center max-lg:items-center justify-start w-full  mx-auto">
              <SearchForm />
            </div>
          </div>
          <div className="flex max-lg:flex-col max-lg:mt-6 max-lg:justify-center max-lg:items-center">
            <div className="">
              <MintTagline />
            </div>
            <div className="flex max-lg:justify-center">
              <FeaturesComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute w-fit bottom-0 left-0 pt-96 pr-96 mt-96 mr-96">
        <Image
          src={heroImg}
          alt="Hero Image"
          layout="responsive"
          className="pr-32" />
      </div>
    </main>
  );
}
