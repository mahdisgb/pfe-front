import { FC, PropsWithChildren, useState } from "react";
import Sider from "@/components/Sider";
import { CanAccess, useResource } from "@refinedev/core";
import {Page403} from "@/pages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HomePageLayout: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const { resource } = useResource();
  const [showsider,setShowsider] = useState(true);
  return (
   <>
   <Header />
    {children}
   </>
  );
};

export default HomePageLayout;
