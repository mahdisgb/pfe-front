import { ConfigProvider } from 'antd';
import arEG from 'antd/locale/ar_EG';
import enUS from 'antd/locale/en_US';
import frFR from 'antd/locale/fr_FR';
import { useTranslation } from 'react-i18next';

const locales = {
  en: enUS,
  fr: frFR,
  ar: arEG,
};

export const AntdProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  return (
    <ConfigProvider locale={locales[currentLocale as keyof typeof locales]}>
      {children}
    </ConfigProvider>
  );
}; 