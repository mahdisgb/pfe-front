import type { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
  {
    name: "home",
    list: "/",
    meta: {
      canDelete: true,
      canAccessUser: [],
      label: "Home",
    },
  },
];
