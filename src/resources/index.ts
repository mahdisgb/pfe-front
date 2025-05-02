import { useTranslate, type IResourceItem } from "@refinedev/core";

export const useResources = (): IResourceItem[] => {
  const translate  = useTranslate();

 const resources = [
    {
      name: "home",
      list: "/",
      meta: {
        label: "Home",
      },
    },
    {
      name: "categories",
      list: "/categories",
      meta: {
        label: "Categories",
      },
    },
    {
      name: "courses",
      list: "/courses",
      meta: {
        label: "Courses",
      },
    },
    {
      name: "lessons",
      list: "/lessons",
      meta: {
        label: "Lessons",
      },
    },
    

  ]
  return resources
}