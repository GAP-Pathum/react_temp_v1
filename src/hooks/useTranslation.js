import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { getTranslation } from '../translations';

export const useTranslation = () => {
  const { language } = useContext(LanguageContext);
  
  const t = (key) => getTranslation(language, key);
  
  return { t, language };
};

export default useTranslation;
