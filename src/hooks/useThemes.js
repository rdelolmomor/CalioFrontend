import { useState, useEffect, useCallback } from 'react';

/**
 * Efecto para gestionar el modo oscuro y que haya persistencia de datos.
 * @return {array} Array : [darkMode : Boolean, changeTheme : Function].
 */
function useThemes() {
  const [darkMode, setDarkMode] = useState(false);

  const changeTheme = useCallback(() => {
    window.localStorage.setItem('darkModeCalio', !darkMode);
    setDarkMode(isDarkModeActive => !isDarkModeActive);
  }, [darkMode]);

  useEffect(() => {
    const localDarkMode = window.localStorage.getItem('darkModeCalio');
    setDarkMode(localDarkMode === 'true');
  }, []);

  return { darkMode, changeTheme };
}

export default useThemes;
