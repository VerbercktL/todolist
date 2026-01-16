import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  toggleCompleted,
  toggleEdit,
  handleTodoChange,
  deleteTodo,
  darkMode,
}) {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleCompleted={toggleCompleted}
          toggleEdit={toggleEdit}
          handleTodoChange={handleTodoChange}
          deleteTodo={deleteTodo}
          darkMode={darkMode}
        />
      ))}
    </ul>
  );
}
