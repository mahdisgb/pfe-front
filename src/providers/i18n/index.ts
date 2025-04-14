
import { I18nProvider } from "@refinedev/core";
import { useTranslation } from "react-i18next";

const i18nProviderContext = () => {
  const { i18n, t } = useTranslation();

  return {
    i18nProvider: {
      translate: (key: string, options?: any) => t(key, options) as string,
      changeLocale: (lang: string, options?: any) => i18n.changeLanguage(lang),
      getLocale: () => i18n.language,
    }as I18nProvider
  }
}
export default i18nProviderContext