import { useGo } from "@refinedev/core"

export const Page403 = () => {
  const go = useGo();
  return (
    <>
    <h1 className="text-[25rem]">403</h1>
    <button
    onClick={()=>go({to:"/"})}>Go Home</button>
    </>
  )
}
