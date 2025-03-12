import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from 'src/locales/en/translation.json';
import ruTranslation from 'src/locales/ru/translation.json';

const resources = {
    en: {
        translation: enTranslation,
    },
    ru: {
        translation: ruTranslation,
    },
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
        },
    });

export default i18n;
