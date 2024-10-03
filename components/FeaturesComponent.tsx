import React from 'react';
import { PiPlusCircle } from 'react-icons/pi';

const FeaturesComponent = () => {
    const features = [
        "Decentralised Identity",
        "D-Link Tree",
        "Sub-Domain",
        "Tips & Fundraising",
    ];

    return (
        <div className='flex mx-auto pb-4 '>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-4 sm:gap-6 '>
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className='flex flex-col items-center gap-2 border-b-2 border-yellow-700 py-2 md:flex-row'>
                        {/* <CirclePlus className="w-6 h-6 flex-shrink-0" /> */}
                        <PiPlusCircle className="w-6 h-6 flex-shrink-0" />
                        <div className=' font-semibold text-sm sm:text-base md:text-lg text-black text-center md:text-left'>
                            {feature}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturesComponent;