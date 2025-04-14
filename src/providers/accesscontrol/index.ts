import type {
  AccessControlProvider,
  CanParams,
  CanResponse,
} from "@refinedev/core";

export const accessControlProvider: AccessControlProvider = {
  can: async ({ params }: CanParams): Promise<CanResponse> => {
   
    return Promise.reject({
      can: false,
    });
  },
};
