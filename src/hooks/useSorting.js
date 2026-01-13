import { useState, useEffect } from "react";

export default function useSorting(defaultValue = "Date") {
  const [sortBy, setSortBy] = useState(() => {
    const savedSorting = localStorage.getItem("sorting");
    return savedSorting ? JSON.parse(savedSorting) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem("sorting", JSON.stringify(sortBy));
  }, [sortBy]);

  return [sortBy, setSortBy];
}
