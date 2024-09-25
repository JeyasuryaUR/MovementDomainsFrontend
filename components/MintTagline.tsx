import Image from 'next/image';
import React from 'react';
import bottomRightArrow from '@/assets/icons/bottomRightArrow.svg';

export const MintTagline = () => {
    return (
        <div className='flex flex-row justify-center md:justify-start items-start w-full '>
            <div className='flex items-center max-w-32 text-black font-weight-500 font-semibold text-lg text-left '>
                Mint and get these features
            </div>
            <Image
                  loading="lazy"
                  src={bottomRightArrow}
                  alt="Bottom Right Arrow"
                  layout="intrinsic"
                  width={50}
                  height={50}
                  className="object-contain"
                />
        </div>
    )
}