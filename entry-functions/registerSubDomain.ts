import type { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";

export type registerDomainArguments = {
  domain_name: string;
  subdomain_name:string; // the account address to transfer the APT to
  expiration_time_secs: number; // the APT amount to transfer
};

export const registerSubDomain = (args: registerDomainArguments): InputTransactionData => {
  const { domain_name, subdomain_name, expiration_time_secs } = args;
  return {
    data: {
      function:  `${MODULE_ADDRESS}::mns::register_subdomain` ,
      functionArguments: [domain_name, subdomain_name, expiration_time_secs],
    },
  };
};