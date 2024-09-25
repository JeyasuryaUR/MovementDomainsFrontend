import React from 'react';

interface PriceItemProps {
  label: string;
  price: string;
  isTotal?: boolean;
}

const PriceItem: React.FC<PriceItemProps> = ({ label, price, isTotal = false }) => {
  const totalStyling = isTotal ? 'mt-2 text-zinc-700' : 'text-neutral-400';

  return (
    <div className={`flex flex-wrap gap-4 md:gap-10 justify-between items-center w-full ${totalStyling}`}>
      <div className="self-stretch my-auto text-sm md:text-base">{label}</div>
      <div className="self-stretch my-auto text-sm md:text-base">{price} ETH</div>
    </div>
  );
};

export default PriceItem;