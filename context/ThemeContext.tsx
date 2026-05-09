import React, { createContext, useContext, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof darkColors;
}

const darkColors = {
  bg: "#0D0D0D",
  card: "#1A1A1A",
  accent: "#7C6FF7",
  accentGlow: "rgba(124,111,247,0.25)",
  accentRing: "#2A2A3A",
  text: "#FFFFFF",
  subtext: "#888888",
  tagline: "#4ADE80",
  inputBg: "#1F1F1F",
  inputBorder: "#2A2A2A",
  chipBg: "#1F1F1F",
  chipBorder: "#333333",
  deleteBg: "#2A1A1A",
};

const lightColors = {
  bg: "#E8F5E9",
  card: "#FFFFFF",
  accent: "#22C55E",
  accentGlow: "rgba(34,197,94,0.2)",
  accentRing: "#C8E6C9",
  text: "#1A1A1A",
  subtext: "#555555",
  tagline: "#16A34A",
  inputBg: "#FFFFFF",
  inputBorder: "#D1FAE5",
  chipBg: "#F0FDF4",
  chipBorder: "#BBF7D0",
  deleteBg: "#FEF2F2",
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  colors: darkColors,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const colors = theme === "dark" ? darkColors : lightColors;
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);