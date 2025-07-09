import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Default_layout from './layouts/Default_layout';
import AppRoutes from './router';
import './App.css';
import ThemeProvider from './context/ThemeContext';
import LanguageProvider from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Default_layout>
              <AppRoutes />
            </Default_layout>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;