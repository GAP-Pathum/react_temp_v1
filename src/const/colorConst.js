//react\src\const\colorConst.js
/**
 * Color constants for application theming
 * Includes light and dark theme variations with semantic color naming
 */

// Base neutral colors (shared across themes)
const neutralColors = {
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Brand colors (consistent across themes)
const brandColors = {
  primary: '#FF7600',         // Vibrant orange as primary brand color
  primaryLight: '#FF9A40',    // Lighter shade of primary
  primaryDark: '#D65C00',     // Darker shade of primary
  secondary: '#6C757D',       // Medium gray as secondary color
  secondaryLight: '#A9B1B8',  // Lighter shade of secondary
  secondaryDark: '#495057',   // Darker shade of secondary
  success: '#28A745',         // Green for success states
  danger: '#DC3545',          // Red for error states
  warning: '#FFC107',         // Yellow for warning states
  info: '#17A2B8',            // Teal for informational states
};

// Light theme palette
const lightTheme = {
  ...neutralColors,
  ...brandColors,
  // Background colors
  bgBody: '#F8F9FA',          // Light gray for main background
  bgCard: '#FFFFFF',          // White for cards and containers
  bgSidebar: '#FFFFFF',       // White for sidebar
  bgHeader: '#FFFFFF',        // White for header
  bgHover: '#F1F3F5',         // Light gray for hover states
  bgActive: '#E2E6EA',        // Medium light gray for active states
  bgDisabled: '#E9ECEF',      // Light gray for disabled elements

  // Text colors
  textPrimary: '#212529',     // Near-black for primary text
  textSecondary: '#6C757D',   // Medium gray for secondary text
  textMuted: '#ADB5BD',       // Light gray for muted text
  textLight: '#FFFFFF',       // White text for dark backgrounds
  textLink: '#FF7600',        // Orange for links
  textLinkHover: '#D65C00',   // Darker orange for link hover
  textDisabled: '#ADB5BD',    // Light gray for disabled text

  // Border colors
  border: '#DEE2E6',          // Light gray for borders
  borderLight: '#E9ECEF',     // Lighter gray for subtle borders
  borderFocus: '#FF9A40',     // Light orange for focus states

  // Shadow
  shadow: '0 .5rem 1rem rgba(0, 0, 0, .15)',
  shadowSm: '0 .125rem .25rem rgba(0, 0, 0, .075)',

  // Status indicators
  statusOnline: '#28A745',    // Green for online/active status
  statusAway: '#FFC107',      // Yellow for away status
  statusBusy: '#DC3545',      // Red for busy/do not disturb

  // Chart colors (for data visualization)
  chart1: '#FF7600',
  chart2: '#4BC0C0',
  chart3: '#9966FF',
  chart4: '#36A2EB',
  chart5: '#FFCE56',
};

// Dark theme palette
const darkTheme = {
  ...neutralColors,
  ...brandColors,
  // Background colors
  bgBody: '#212529',          // Dark gray for main background
  bgCard: '#343A40',          // Medium dark gray for cards and containers
  bgSidebar: '#343A40',       // Medium dark gray for sidebar
  bgHeader: '#343A40',        // Medium dark gray for header
  bgHover: '#495057',         // Medium gray for hover states
  bgActive: '#6C757D',        // Gray for active states
  bgDisabled: '#495057',      // Medium gray for disabled elements

  // Text colors
  textPrimary: '#F8F9FA',     // Near-white for primary text
  textSecondary: '#CED4DA',   // Light gray for secondary text
  textMuted: '#ADB5BD',       // Medium gray for muted text
  textLight: '#F8F9FA',       // Near-white text for general use
  textLink: '#FF9A40',        // Light orange for links
  textLinkHover: '#FFB366',   // Even lighter orange for link hover
  textDisabled: '#6C757D',    // Medium gray for disabled text

  // Border colors
  border: '#495057',          // Medium gray for borders
  borderLight: '#6C757D',     // Gray for subtle borders
  borderFocus: '#FF9A40',     // Light orange for focus states

  // Shadow
  shadow: '0 .5rem 1rem rgba(0, 0, 0, .4)',
  shadowSm: '0 .125rem .25rem rgba(0, 0, 0, .2)',

  // Status indicators (same as light for consistency)
  statusOnline: '#28A745',
  statusAway: '#FFC107',
  statusBusy: '#DC3545',
  
  // Chart colors (slightly adjusted for dark bg)
  chart1: '#FF9A40',
  chart2: '#5FD3D3',
  chart3: '#B088FF',
  chart4: '#59B4F3',
  chart5: '#FFDA7A',
};

// Semantic naming for specific UI elements (same keys for both themes)
const commonUIElements = {
  // Cards
  cardHeaderBg: 'bgCard',
  cardBodyBg: 'bgCard',
  cardBorder: 'border',
  
  // Navigation
  navActiveBg: 'primary',
  navActiveText: 'white',
  navInactiveText: 'textSecondary',
  navHoverBg: 'bgHover',
  
  // Buttons
  buttonPrimaryBg: 'primary',
  buttonPrimaryText: 'white',
  buttonSecondaryBg: 'secondary',
  buttonSecondaryText: 'white',
  
  // Forms
  inputBg: 'bgCard',
  inputBorder: 'border',
  inputText: 'textPrimary',
  inputPlaceholder: 'textMuted',
  
  // Tables
  tableHeaderBg: 'bgCard',
  tableBodyBg: 'bgCard',
  tableBorder: 'border',
  tableHoverBg: 'bgHover',
  
  // Sidebar specific
  sidebarLogo: 'primary',
  sidebarActiveBg: 'primary',
  sidebarActiveText: 'white',
  
  // Modal specific
  modalOverlay: 'rgba(0,0,0,0.5)',
  modalBg: 'bgCard',
};

// Complete theme objects
export const themes = {
  light: {
    ...lightTheme,
    name: 'light',
    uiElements: Object.fromEntries(
      Object.entries(commonUIElements).map(([key, value]) => [key, lightTheme[value]])
    ),
  },
  dark: {
    ...darkTheme,
    name: 'dark',
    uiElements: Object.fromEntries(
      Object.entries(commonUIElements).map(([key, value]) => [key, darkTheme[value]])
    ),
  },
};

// Default theme
export const defaultTheme = 'light';

// Helper function to get a theme value
export const getThemeValue = (themeName, key) => {
  const theme = themes[themeName] || themes[defaultTheme];
  
  // Check in UI elements first
  if (theme.uiElements && theme.uiElements[key]) {
    return theme.uiElements[key];
  }
  
  // Then check in the main theme
  return theme[key] || null;
};

export default themes;