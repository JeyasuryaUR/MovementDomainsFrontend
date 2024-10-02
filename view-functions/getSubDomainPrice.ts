import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants";
export type domainPriceArgs = {
    _registration_duration_secs: number;
};


export const getSubDomainPrice = async (args: domainPriceArgs): Promise<number> => {
    const content = await aptosClient()
      .view<[string]>({
        payload: {
          function: `${MODULE_ADDRESS}::mns::price_for_subdomain`,
          functionArguments : [args._registration_duration_secs]
        },
      })
      .catch((error) => {
        console.error(error);
        return [error.message];
      });
  
    return content[0];
  };
