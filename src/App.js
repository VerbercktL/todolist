import { useEffect, useState } from "react";
import useSorting from "./hooks/useSorting";
import useTodos from "./hooks/useTodos";

import Header from "./Components/Header";
import useColorMode from "./hooks/useColorMode";

function App() {
  const {
    todos,
    addTodo,
    toggleCompleted,
    deleteTodo,
    toggleEdit,
    handleTodoChange,
  } = useTodos();

  const [sortBy, setSortBy] = useSorting();
  const [newTodo, setNewTodo] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === "Name") {
      return a.text.localeCompare(b.text);
    } else if (sortBy === "Status") {
      return a.completed - b.completed;
    } else if (sortBy === "Date") {
      return a.id - b.id;
    }
    return 0;
  });

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start p-4 transition-colors duration-500 ${
        darkMode ? "dark" : "light"
      }`}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div
        className={`w-full max-w-md rounded-2xl shadow-lg p-6 transition-colors duration-500 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Todo List
        </h1>

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

        <ul className="space-y-3">
          {sortedTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-500 ${
                darkMode
                  ? "bg-gray-700 text-gray-100"
                  : "bg-gray-50 text-gray-800"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompleted(todo.id)}
                  className="w-4 h-4 text-blue-600 rounded"
                />

                {todo.editing ? (
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => handleTodoChange(todo.id, e.target.value)}
                    className={`flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-colors duration-500 ${
                      darkMode
                        ? "bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-500"
                        : "bg-gray-100 border-gray-300 text-gray-800 focus:ring-blue-500"
                    }`}
                  />
                ) : (
                  <span
                    className={
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }
                  >
                    {todo.text}
                  </span>
                )}
              </div>

              <div className="flex gap-2 ml-3">
                <button
                  onClick={() => toggleEdit(todo.id)}
                  className={`text-sm transition-colors duration-500 ${
                    darkMode
                      ? "text-yellow-400 hover:text-yellow-300"
                      : "text-yellow-600 hover:text-yellow-700"
                  }`}
                >
                  {todo.editing ? "Save" : "Edit"}
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={`text-sm transition-colors duration-500 ${
                    darkMode
                      ? "text-red-400 hover:text-red-300"
                      : "text-red-600 hover:text-red-700"
                  }`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
