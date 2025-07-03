import React, { createContext, useState, useEffect } from 'react';

// Define available languages
export const languages = {
  en: {
    code: 'en',
    name: 'English',
    dir: 'ltr'
  },
  si: {
    code: 'si',
    name: 'සිංහල', // Sinhalese
    dir: 'ltr'
  }
};

// Default language
export const defaultLanguage = 'en';

// Create the context
export const LanguageContext = createContext();

// Create provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or use defaultLanguage
    return localStorage.getItem('language') || defaultLanguage;
  });

  // Update localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = languages[language].dir;
  }, [language]);

  const changeLanguage = (code) => {
    if (languages[code]) {
      setLanguage(code);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
