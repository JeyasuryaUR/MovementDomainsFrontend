import React from "react";
import Image from "next/image";
import Link from "next/link";

interface DomainListingCardProps {
  name: string;
  expiryTime: string;
  imageUrl: any;
}

const DomainListingCard: React.FC<DomainListingCardProps> = ({
  name,
  expiryTime,
  imageUrl,
}) => {
  return (
    <Link href={`/mydomains/${name}`}>
      <article className="flex flex-wrap gap-3 md:gap-5 items-center px-3 md:px-4 py-3 md:py-4 mt-2 w-full rounded-md border border-solid bg-stone-50 border-zinc-400 shadow-xl">
        <div className="flex overflow-hidden flex-col justify-center items-center self-stretch my-auto w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border border-solid border-zinc-200 shadow-sm">
          <Image
            src={imageUrl}
            alt={name}
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col self-stretch text-zinc-800">
          <h2 className="text-base md:text-lg tracking-tighter">{name}</h2>
          <p className="mt-1 text-zinc-500 text-opacity-80 text-xs md:text-sm tracking-tighter">
            Expires in {expiryTime}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default DomainListingCard;