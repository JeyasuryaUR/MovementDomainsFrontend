import React from 'react';
import { FaShield } from 'react-icons/fa6';

interface DomainHeaderProps {
  domain: string;
}

const DomainHeader: React.FC<DomainHeaderProps> = ({ domain }) => (
  <div className="flex flex-col self-start p-4 md:p-6">
    <div className="flex flex-col text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap text-zinc-800">
      <div>{domain}</div>
    </div>
    <div className="flex overflow-hidden gap-1 items-start self-start mt-2 md:mt-3.5 text-xs md:text-sm font-medium tracking-tight text-[#5353a4]">
      <div className="flex gap-1 justify-center items-center px-2 py-1.5 border border-solid bg-[#5353a4] bg-opacity-10 border-[#5353a4] rounded-full">
        <FaShield />
        <div className="self-stretch my-auto">Your primary name</div>
      </div>
    </div>
  </div>
);

export default DomainHeader;