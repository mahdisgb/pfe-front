import { useGo, useTranslation } from "@refinedev/core"

export const Page404 = () => {
  const go = useGo();
  const { translate: t } = useTranslation();
  
  return (
    <>
      <h1 className="text-[25rem]">404</h1>
      <button onClick={() => go({ to: "/" })}>{t('common.goHome')}</button>
    </>
  )
}
