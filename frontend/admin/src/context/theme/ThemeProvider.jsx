import { theme as antdTheme } from "antd";
import { THEMES } from "constants/demoData";
import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(THEMES.DEFAULT);

  const algorithm = useMemo(() => {
    switch (theme) {
      case THEMES.DARK:
        return antdTheme.darkAlgorithm;
      case THEMES.COMPACT:
        return antdTheme.compactAlgorithm;
      default:
        return antdTheme.defaultAlgorithm;
    }
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(Number(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        algorithm,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
