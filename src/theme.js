import { createContext, useMemo, useState } from 'react'



export const themeModeContext = createContext({
  toggleMode: () => {}
});

export const useMode = () => {
  const [themeMode, setThemeMode] = useState();

  const mode = useMemo(
    () => ({
      toggleMode: () => setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light') )
    }), []
  )
}

