import { useEffect, useState } from "react";

function getInitialColorMode() {
  // 1️⃣ Check localStorage first
  const saved = localStorage.getItem("darkMode");
  if (saved !== null) {
    return JSON.parse(saved);
  }

  // 2️⃣ No saved value → decide based on time
  const hour = new Date().getHours();

  // Dark mode between 20:00 and 08:00
  return hour >= 20 || hour < 8;
}

export default function useColorMode() {
  const [darkMode, setDarkMode] = useState(getInitialColorMode);

  // 3️⃣ Persist changes
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return [darkMode, setDarkMode];
}
