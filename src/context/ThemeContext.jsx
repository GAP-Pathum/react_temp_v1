import React, { createContext, useState, useEffect } from 'react';
import { defaultTheme } from '../const/colorConst';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or use defaultTheme
    return localStorage.getItem('theme') || defaultTheme;
  });

  // Update localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    // Update the body class for global styling
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;