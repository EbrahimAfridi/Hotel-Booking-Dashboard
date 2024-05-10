import {createContext, useContext, useEffect} from "react";
import {useLocalStorageState} from "../../hooks/useLocalStorageState.js";

const DarkModeContext = createContext();

function DarkModeProvider({children}) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    // This is used to match the user's Operating system's preference.
    window.matchMedia('(prefers-color-scheme:  dark)').matches,
    'isDarkMode'
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev);
  }

  return (
    <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
      {children}
    </DarkModeContext.Provider>
  )
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

export {useDarkMode, DarkModeProvider};