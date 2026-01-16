export default function SuggestedTodosLayout({ children }) {
  return (
    <section className="suggested-todos">
      <h2>Suggested Todos</h2>
      <ul>{children}</ul>
    </section>
  );
}
