export default function SuggestedTodoItem({ title, addTodo }) {
  return (
    <li className="flex justify-between items-center gap-2">
      <span>{title}</span>
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => addTodo(title)}
      >
        Add
      </button>
    </li>
  );
}
