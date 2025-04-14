import { FC, PropsWithChildren } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useDocumentTitle } from "@refinedev/react-router-v6"

const PublicLayout: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
     useDocumentTitle("project name");
     return (
          <div className="min-h-screen flex">
               <main className="flex flex-col flex-grow">
                    <Header title="Login" />
                    {children}
                    <Footer />
               </main>
          </div>
     )
}

export default PublicLayout