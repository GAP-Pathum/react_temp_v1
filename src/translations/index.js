import en from './en';
import si from './si';

export const translations = {
  en,
  si
};

// Helper function to get translation text
export const getTranslation = (language, key) => {
  if (!translations[language] || !translations[language][key]) {
    // Fallback to English if translation is missing
    return translations.en[key] || key;
  }
  return translations[language][key];
};

export default translations;
