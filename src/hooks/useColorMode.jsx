import { useEffect, useState } from "react";

export default function useColorMode() {
  const [darkMode, setDarkMode] = useState(false);
  // localStorage opslaan
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // localStorage laden
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) setDarkMode(JSON.parse(saved));
  }, []);
  return [darkMode, setDarkMode];
}
