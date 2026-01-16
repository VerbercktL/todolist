export default function SortSelect({ sortBy, setSortBy, darkMode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <label className="text-sm text-gray-600">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={`px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors duration-500 ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-green-500"
            : "bg-gray-100 border-gray-300 text-gray-800 focus:ring-blue-500"
        }`}
      >
        <option value="Date">Date</option>
        <option value="Name">Name</option>
        <option value="Status">Status</option>
      </select>
    </div>
  );
}
