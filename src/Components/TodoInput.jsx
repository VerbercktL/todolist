export default function TodoInput({ newTodo, setNewTodo, addTodo, darkMode }) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className={`flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-colors duration-500 ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-green-500"
            : "bg-gray-100 border-gray-300 text-gray-800 focus:ring-blue-500"
        }`}
      />
      <button
        onClick={() => {
          addTodo(newTodo);
          setNewTodo("");
        }}
        className={`px-4 py-2 rounded-lg transition-colors duration-500 ${
          darkMode
            ? "bg-green-500 text-gray-900 hover:bg-green-600"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Add
      </button>
    </div>
  );
}
