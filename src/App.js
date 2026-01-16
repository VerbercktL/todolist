import { useState } from "react";
import useSorting from "./hooks/useSorting";
import useTodos from "./hooks/useTodos";
import useColorMode from "./hooks/useColorMode";

import Header from "./Components/Header";
import TodoInput from "./Components/TodoInput";
import SortSelect from "./Components/SortSelect";
import TodoList from "./Components/TodoList";
import SuggestedTodos from "./Components/SuggestedTodos/SuggestedTodos";

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
  const [darkMode, setDarkMode] = useColorMode();

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === "Name") return a.text.localeCompare(b.text);
    if (sortBy === "Status") return a.completed - b.completed;
    return a.id - b.id;
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
        <h1 className="text-2xl font-bold text-center mb-6">Todo List</h1>
        <SuggestedTodos addTodo={addTodo} />
        <TodoInput
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
          darkMode={darkMode}
        />
        <SortSelect sortBy={sortBy} setSortBy={setSortBy} darkMode={darkMode} />
        <TodoList
          todos={sortedTodos}
          toggleCompleted={toggleCompleted}
          toggleEdit={toggleEdit}
          handleTodoChange={handleTodoChange}
          deleteTodo={deleteTodo}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default App;
