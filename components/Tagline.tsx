import React from "react";
import ArrowAsset from "./svg-components/ArrowAsset";

export const TaglineComponent = () => {
  return (
    <div className="container mx-auto font-secondary px-4 sm:px-6 lg:px-8 md:py-2 xl:py-4">
      <div className="flex flex-col ml-80 max-w-md xs:max-w-xs sm:max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-full mx-auto">
        {/* Tagline */}
        <div className="px-8  bg-moveyellow py-4 sm:py-4 md:py-2 lg:py-4 xl:py-6 text-black font-medium text-lg sm:text-xl md:text-2xl lg:text-6xl xl:text-7xl ">
          Decentralize Your Digital Identity with One-Click .move domains
        </div>
      </div>
    </div>
  );
};
