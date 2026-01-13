export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="flex items-center justify-between w-full max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold">
        {darkMode ? "Dark Mode 🌙" : "Light Mode ☀️"}
      </h1>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
        <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-7"></div>
      </label>
    </header>
  );
}
