import { useTranslation } from '@refinedev/core';

const Footer = () => {
  const { translate: t } = useTranslation();
  
  return (
    <footer className="text-center">
      <div>{t('common.copyright')}</div>
    </footer>
  )
}

export default Footer