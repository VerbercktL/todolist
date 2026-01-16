import { useEffect, useState } from "react";
import SuggestedTodoItem from "./SuggestedTodoItem";
import SuggestedTodosLayout from "./SuggestedTodosLayout";

export default function SuggestedTodos({ addTodo }) {
  const [suggestedTodos, setSuggestedTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((data) => {
        setSuggestedTodos(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <SuggestedTodosLayout>
      {isLoading && <p>Loading suggestions...</p>}

      {!isLoading && suggestedTodos.length === 0 && (
        <p>No suggestions available.</p>
      )}

      {!isLoading &&
        suggestedTodos.map((todo) => (
          <SuggestedTodoItem
            key={todo.id}
            title={todo.title}
            addTodo={addTodo} // ✅ hier doorgeven
          />
        ))}
    </SuggestedTodosLayout>
  );
}
