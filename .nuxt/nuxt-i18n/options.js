

export const Constants = {
  COMPONENT_OPTIONS_KEY: "nuxtI18n",
  STRATEGIES: {"PREFIX":"prefix","PREFIX_EXCEPT_DEFAULT":"prefix_except_default","PREFIX_AND_DEFAULT":"prefix_and_default","NO_PREFIX":"no_prefix"},
  REDIRECT_ON_OPTIONS: {"ALL":"all","ROOT":"root","NO_PREFIX":"no prefix"},
}
export const nuxtOptions = {
  isUniversalMode: true,
  trailingSlash: undefined,
}
export const options = {
  vueI18n: {"fallbackLocale":"en","messages":{"en":{"title":"ReplicaZone","full_title":"ReplicaZone - Snipcart Demo","notice":"Snipcart-powered demo store.","my_account":"My account","login":"Login","quantity":"QUANTITY","format":"FORMAT","physical_copy":"Physical copy","digital_copy":"Digital copy (.jpeg)","add_to_cart":"Add to cart","subscribe":"subscribe","footer_text":"Nuxt.js static site with Snipcart e-commerce."},"fr":{"title":"RéplicaZone","full_title":"RéplicaZone - Démo Snipcart","notice":"Démo d'une boutique propulsée par Snipcart","my_account":"Mon compte","login":"Connexion","quantity":"QUANTITÉ","format":"FORMAT","physical_copy":"Copie physique","digital_copy":"Copie numérique (.jpeg)","add_to_cart":"Acheter","subscribe":"S'abonner","footer_text":"Site statique avec Nuxt.js et Snipcart."}}},
  vueI18nLoader: false,
  locales: ["en","fr"],
  defaultLocale: "en",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  defaultLocaleRouteNameSuffix: "default",
  sortRoutes: true,
  strategy: "prefix_except_default",
  lazy: false,
  langDir: null,
  rootRedirect: null,
  detectBrowserLanguage: {"alwaysRedirect":false,"cookieCrossOrigin":false,"cookieDomain":null,"cookieKey":"i18n_redirected","cookieSecure":false,"fallbackLocale":"","redirectOn":"root","useCookie":true,"onlyOnRoot":true},
  differentDomains: false,
  baseUrl: "",
  vuex: {"moduleName":"i18n","syncRouteParams":true},
  parsePages: true,
  pages: {},
  skipSettingLocaleOnNavigate: false,
  onBeforeLanguageSwitch: () => {},
  onLanguageSwitched: () => null,
  normalizedLocales: [{"code":"en"},{"code":"fr"}],
  localeCodes: ["en","fr"],
  additionalMessages: [],
}

export const localeMessages = {}
