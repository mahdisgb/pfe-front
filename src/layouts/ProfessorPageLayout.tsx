import SideBar from "@/pages/profile/professor/Components/Sidebar";
import { Layout, theme } from "antd"
const { Content } = Layout
import { PropsWithChildren } from "react"

type ProfessorPageLayoutProps = {
    children: any,
} & PropsWithChildren
export default function ProfessorPageLayout(
    {children}:ProfessorPageLayoutProps) {
  return (
      <Layout
      style={
        {
            height:"calc(100vh - 65px)"
        }
      }
      >
        <SideBar />
        <Layout >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              backgroundColor: "#f7f7f7",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
  );
}
