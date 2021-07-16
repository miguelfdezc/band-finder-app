import memoize from 'lodash.memoize';

import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';
export const translationGetters = {
  'es-ES': () => require('./es.json'),
  'en-GB': () => require('./en.json'),
  'en-US': () => require('./en.json'),
};
export const t = memoize(
  (key, config) =>
    i18n.t(key, config).includes('missing') ? key : i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);
export const init = () => {
  let localeLanguageTag = Localization.locale;
  let isRTL = Localization.isRTL;
  t.cache.clear();

  I18nManager.forceRTL(isRTL);

  i18n.translations = {
    [localeLanguageTag]: translationGetters[localeLanguageTag](),
  };
  i18n.locale = localeLanguageTag;
};
