import { FC, PropsWithChildren, useState } from "react";
import Sider from "@/components/Sider";
import { CanAccess, useResource } from "@refinedev/core";
import {Page403} from "@/pages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivateLayout: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const { resource } = useResource();
  const [showsider,setShowsider] = useState(true);
  return (
    <CanAccess
      action="*"
      fallback={<Page403 />}
    >
        <Header />
        <div className="h-[80.3vh] flex flex-col">
          <main className="flex flex-grow ">
           <Sider showsider={showsider}/>
            <div className="bg-gradient-to-t from-[#ccc] to-[white] flex-grow p-5 pt-5 overflow-auto">{children}</div>
          </main>
            <Footer />
        </div>
    </CanAccess>
  );
};

export default PrivateLayout;
