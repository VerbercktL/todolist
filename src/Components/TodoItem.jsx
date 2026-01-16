export default function TodoItem({
  todo,
  toggleCompleted,
  toggleEdit,
  handleTodoChange,
  deleteTodo,
  darkMode,
}) {
  return (
    <li
      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-500 ${
        darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-50 text-gray-800"
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
          <span className={todo.completed ? "line-through text-gray-500" : ""}>
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
  );
}
