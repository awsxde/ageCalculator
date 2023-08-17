export default function Form({ onSubmit, children }) {
  return (
    <form className="form" autoComplete="off" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
