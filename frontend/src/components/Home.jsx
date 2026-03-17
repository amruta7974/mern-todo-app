import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchtodos = async () => {
      try {
        setLoading(true);
        const response = await API.get("/todo/fetch", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data.todos);
        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchtodos();
  }, []);

  const todoCreate = async () => {
    if (!newTodo) return;
    try {
      const response = await API.post(
        "/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        
      );
      console.log(response.data.newTodo);
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to create todo");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await API.put(
        `/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
       
      );
      console.log(response.data.todo);
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError("Failed to find todo status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await API.delete(`/todo/delete/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("Failed to Delete Todo");
    }
  };

  const navigateTo = useNavigate();
  const logout = async () => {
    try {
      await API.post("/user/logout");
      toast.success("User logged out successfully");
      navigateTo("/login");
     localStorage.removeItem("token");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen flex items-center justify-center  bg-[rgb(246,242,239)]  px-4">
      <div className="w-full max-w-xl bg-[#1C2340] text-white rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">My Todo List</h1>

        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && todoCreate()}
            className="flex-grow p-3 rounded-l-md text-[#ebedf6] border-[#ebedf6]"
          />

          <button
            onClick={todoCreate}
            className="bg-[#50223C] hover:bg-[#3e1a2f] px-5 py-3 rounded-r-md font-semibold transition duration-300"
          >
            Add
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 font-semibold">{error}</div>
        ) : todos.length === 0 ? (
          <div className="text-center py-10 text-gray-300">
            <p className="text-lg font-semibold">No todos yet</p>
            <p className="text-sm">Add your first task to get started</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo, index) => (
              <li
                key={todo._id || index}
                className="flex items-center justify-between p-3 bg-[rgb(246,242,239)] text-[#50223C] rounded-md shadow-sm"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => todoStatus(todo._id)}
                    className="mr-3 h-4 w-4"
                  />

                  <span
                    className={`${
                      todo.completed ? "line-through opacity-60" : "font-medium"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>

                <button
                  onClick={() => todoDelete(todo._id)}
                  className="text-[#50223C] font-semibold transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-6 text-center text-sm text-gray-300">
          {remainingTodos} remaining todos
        </p>

        <button
          onClick={() => logout()}
          className="mt-6 w-full bg-[#50223C] hover:bg-[#3e1a2f] py-2 rounded-md font-semibold transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
