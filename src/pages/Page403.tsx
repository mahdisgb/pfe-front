import { useGo, useTranslation } from "@refinedev/core"

export const Page403 = () => {
  const go = useGo();
  const { translate: t } = useTranslation();
  
  return (
    <>
      <h1 className="text-[25rem]">403</h1>
      <button onClick={() => go({ to: "/" })}>{t('common.goHome')}</button>
    </>
  )
}
