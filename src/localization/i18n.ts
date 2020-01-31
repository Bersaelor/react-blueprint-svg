// Resources:
// - https://medium.com/@jishnu61/6-easy-steps-to-localize-your-react-application-internationalization-with-i18next-8de9cc3a66a1
// - https://react.i18next.com/latest/using-with-hooks

import i18n from 'i18next';
import LangDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import lang from './languages/index';

const options = {
	order: ['navigator'],
};

i18n
	.use(LangDetector)
	.use(initReactI18next)
	.init({
	resources: {
		// Use official country code
		// See: https://www.metamodpro.com/browser-language-codes
		en: {
			translations: lang.en,
		},
		de: {
			translations: lang.de
		}
	},

	fallbackLng: "en",
	debug: process.env.NODE_ENV === 'development',

	ns: ["translations"],
	defaultNS: "translations",
	keySeparator: false,

	interpolation: {
		escapeValue: false,
		formatSeparator: ",",
	},

	react: {
		wait: false
	},

	detection: options
});

export default i18n;