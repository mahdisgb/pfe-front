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
  {
    name: "categories",
    list: "/categories",
    meta: {
      canDelete: true,
      canAccessUser: [],
      label: "Home",
    },
  },{
    name: "courses",
    list: "/courses",
    meta: {
      canDelete: true,
      canAccessUser: [],
      label: "Home",
    },
  },
];
