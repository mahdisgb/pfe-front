import { FC, PropsWithChildren, useState } from "react";
import Sider from "@/components/Sider";
import { CanAccess, useResource, useTranslation } from "@refinedev/core";
import {Page403} from "@/pages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Layout } from 'antd';

const { Content } = Layout;

const PrivateLayout: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const { resource } = useResource();
  const [showsider,setShowsider] = useState(true);
  const { translate: t } = useTranslation();

  return (
    <CanAccess
      action="*"
      fallback={<Page403 />}
    >
      <Layout className="min-h-screen">
        <Header />
        <Content className="flex-1">
          <main className="flex flex-grow ">
            <Sider showsider={showsider}/>
            <div className="bg-gradient-to-t from-[#ccc] to-[white] flex-grow p-5 pt-5 overflow-auto">{children}</div>
          </main>
        </Content>
        <Footer />
      </Layout>
    </CanAccess>
  );
};

export default PrivateLayout;
