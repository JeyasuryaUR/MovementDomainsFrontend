import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants";
export type domainPriceArgs = {
  domain_length: number;
  registration_secs: number;
};


export const getDomainPrice = async (args: domainPriceArgs): Promise<number> => {
    const content = await aptosClient()
      .view<[string]>({
        payload: {
          function: `${MODULE_ADDRESS}::price_model::price_for_domain`,
          functionArguments : [args.domain_length, args.registration_secs]
        },
      })
      .catch((error) => {
        console.error(error);
        return [error.message];
      });
  
    return content[0];
  };


