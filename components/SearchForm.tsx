import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaStar } from "react-icons/fa";
import { VectorClaim } from "./svg-components/SVGAssets";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toast } from "react-toastify";

const SearchForm: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const router = useRouter();
  const { connected } = useWallet();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (connected) {
      if (inputText.trim()) {
        router.push(`/buy/${inputText}`);
      }
    } else {
      toast.error("Connect wallet to submit");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-3 w-full md:w-fit items-center px-4 py-2 rounded-sm border border-solid shadow-xl border-zinc-400 bg-white bg-opacity-25"
    >
      <div className="flex items-center gap-2 w-full md:w-auto">
        <FaSearch />
        <label htmlFor="nameSearch" className="sr-only">
          Enter your domain
        </label>
        <input
          type="text"
          id="nameSearch"
          placeholder="Enter your domain"
          className="text-base md:text-xl bg-inherit w-full md:w-fit text-stone-900 outline-0"
          aria-label="Enter your domain"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="flex gap-2 justify-center whitespace-nowrap items-center w-full md:w-auto px-4 py-2 rounded-sm text-base md:text-xl font-medium tracking-tighter text-white bg-blue-700"
      >
        <VectorClaim className="p-0 m-0" />
        <span className="self-stretch">claim now</span>
      </button>
    </form>
  );
};

export default SearchForm;
