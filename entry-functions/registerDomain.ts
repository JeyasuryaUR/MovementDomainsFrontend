import type { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";

export type registerDomainArguments = {
  domain_name: string; // the account address to transfer the APT to
  registration_duration_secs: number; // the APT amount to transfer
};

export const registerDomain = (args: registerDomainArguments): InputTransactionData => {
  const { domain_name, registration_duration_secs } = args;
  return {
    data: {
      function:  `${MODULE_ADDRESS}::domains::register_domain` ,
      functionArguments: [domain_name, registration_duration_secs],
    },
  };
};