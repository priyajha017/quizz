import React, { createContext, useContext, useState } from 'react';

// Create a context for theme management
const ThemeContext = createContext();

// Custom hook to access the theme context
export function useTheme() {
  return useContext(ThemeContext);
}

// ThemeProvider component to provide theme-related state to children
export function ThemeProvider({ children }) {
  // State variable to track the current theme (dark or light)
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Function to toggle between dark and light themes
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // Apply the selected theme to the entire document body
    document.body.setAttribute('data-theme', isDarkTheme ? 'light' : 'dark');
  };

  // Object containing theme-related values to be provided to children
  const themeValues = {
    isDarkTheme,
    toggleTheme,
  };

  return (
    // Provide the theme context values to its children
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
}
