import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos
      ? JSON.parse(savedTodos)
      : [
          { id: 1, text: "do laundry", completed: false, editing: false },
          { id: 2, text: "eat hotdogs", completed: false, editing: false },
        ];
  });

  const [newTodo, setNewTodo] = useState("");

  const [sortBy, setSortBy] = useState(() => {
    const savedSorting = localStorage.getItem("sorting");
    return savedSorting ? JSON.parse(savedSorting) : "Date";
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("sorting", JSON.stringify(sortBy));
  }, [todos, sortBy]);

  function addTodo() {
    if (newTodo.trim() === "") return;

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: newTodo,
        completed: false,
        editing: false,
      },
    ]);

    setNewTodo("");
  }

  function toggleCompleted(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function toggleEdit(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, editing: !todo.editing } : todo
      )
    );
  }

  function handleTodoChange(id, value) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: value } : todo))
    );
  }

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === "Name") {
      return a.text.localeCompare(b.text); // alphabetical
    } else if (sortBy === "Status") {
      return a.completed - b.completed; // incomplete first
    } else if (sortBy === "Date") {
      return a.id - b.id; // assuming id ~ creation time
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Todo List
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg"
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
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-800 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="text-sm text-yellow-600 hover:text-yellow-700"
                >
                  {todo.editing ? "Save" : "Edit"}
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-sm text-red-600 hover:text-red-700"
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
