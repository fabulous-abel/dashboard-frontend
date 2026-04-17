import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../translations/en.json';
import am from '../translations/am.json';

const LanguageContext = createContext();

const translations = { en, am };

const getNestedTranslation = (dictionary, key) => {
  if (!dictionary) {
    return undefined;
  }

  return key.split('.').reduce((currentValue, nextKey) => {
    if (currentValue === undefined || currentValue === null) {
      return undefined;
    }

    return currentValue[nextKey];
  }, dictionary);
};

const humanizeTranslationKey = (key) => {
  const fallbackLabel = key.split('.').pop() || key;

  return fallbackLabel
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    localStorage.setItem('lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'am' : 'en');
  };

  const t = (key, params = {}) => {
    let value = getNestedTranslation(translations[language], key);

    if (value === undefined && language !== 'en') {
      value = getNestedTranslation(translations.en, key);
    }

    if (value === undefined) {
      value = humanizeTranslationKey(key);
    }

    if (typeof value === 'string') {
      Object.keys(params).forEach(param => {
        value = value.replace(`{{${param}}}`, params[param]);
      });
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
