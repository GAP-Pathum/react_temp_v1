import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Default_layout from './layouts/Default_layout';
import AppRoutes from './router';
import './App.css';
import ThemeProvider from './context/ThemeContext';
import LanguageProvider from './context/LanguageContext';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Default_layout>
            <AppRoutes />
          </Default_layout>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;