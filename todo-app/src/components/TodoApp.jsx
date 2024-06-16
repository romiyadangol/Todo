import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdSave, MdDelete } from "react-icons/md";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoApp() {
  const notify = (message) => toast(message);

  const [todos, setTodos] = useState([
    { text: "Don't worry", completed: true },
    { text: "Be happy", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
      notify("Todo added!");
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    notify(
      `Todo ${updatedTodos[index].completed ? "completed" : "not completed"}`
    );
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    notify("Todo deleted!");
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].text);
    notify("Editing started!");
  };

  const saveEditing = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: editingText } : todo
    );
    setTodos(updatedTodos);
    setEditingIndex(null);
    notify("Todo saved!");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col items-center py-8 bg-gray-100">
      <div className="flex flex-col justify-center items-center my-8">
        <h1 className="font-bold text-red-500 text-4xl mb-4">TodoApp</h1>
        <form onSubmit={addTodo} className="flex items-center mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="p-2 border rounded-l-lg text-xl"
            placeholder="Add a new todo"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white rounded-r-lg p-3 rounded-md text-2xl flex items-center hover:bg-purple-700 transition-all duration-300"
          >
            <IoMdAdd className="mr-1" />
          </button>
        </form>
      </div>
      <div className="flex flex-row gap-4 justify-center mt-1">
        <button
          onClick={() => {
            setFilter("active");
            notify("Active Todos");
          }}
          className={`text-xl border rounded-full px-6 py-2 transition-all duration-300 ${
            filter === "active"
              ? "bg-pink-500 text-white"
              : "text-pink-500 border-pink-500 hover:bg-pink-500 hover:text-white"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => {
            setFilter("completed");
            notify("Completed Todos");
          }}
          className={`text-xl border rounded-full px-6 py-2 transition-all duration-300 ${
            filter === "completed"
              ? "bg-blue-500 text-white"
              : "text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => {
            setFilter("all");
            notify("All todos");
          }}
          className={`text-xl border rounded-full px-6 py-2 transition-all duration-300 ${
            filter === "all"
              ? "bg-green-500 text-white"
              : "text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
          }`}
        >
          All todos
        </button>
      </div>
      <ul className="mt-8 w-full max-w-md">
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white p-4 my-2 rounded-lg shadow"
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
                className="form-checkbox h-5 w-5 text-purple-600"
              />
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="text-xl flex-grow p-2 border rounded-lg"
                />
              ) : (
                <span
                  className={`text-xl cursor-pointer ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.text}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {editingIndex === index ? (
                <button
                  onClick={() => saveEditing(index)}
                  className="text-green-500 hover:text-green-700 transition-all duration-300"
                >
                  <MdSave className="text-2xl" />
                </button>
              ) : (
                <button
                  onClick={() => startEditing(index)}
                  className="text-blue-500 hover:text-blue-700 transition-all duration-300"
                >
                  <MdEdit className="text-2xl" />
                </button>
              )}
              <button
                onClick={() => deleteTodo(index)}
                className="text-red-500 hover:text-red-700 transition-all duration-300"
              >
                <MdDelete className="text-2xl" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}

export default TodoApp;
