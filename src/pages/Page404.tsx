import { useGo } from "@refinedev/core"

export const Page404 = () => {
  const go = useGo();
  return (
    <>
    <h1 className="text-[25rem]">404</h1>
    <button
    onClick={()=>go({to:"/"})} >Go Home</button>
    </>

  )
}
