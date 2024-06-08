"use client";
import { useEffect, useState } from "react";
import { serverUrl } from "./serverUrl";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "./state/TodoSlice";

export default function Home() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  const handleAddTodo = () => {
    dispatch(addTodo({ name: name, description: description, id: Date.now() }));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo({ id: id }));
  };

  const handleUpdateTodo = (id, complete) => {
    dispatch(updateTodo({ id: id, completed: complete }));
  };

  const todosDiv = todos.map((todo) => (
    <div className={"todo" + todo.complete ?? " complete"} key={todo.id}>
      <p className="name">{todo.name}</p>
      <p className="description">{todo.description}</p>
      <button className="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>
        delete
      </button>
      <button
        className="complte-btn"
        onClick={() => handleUpdateTodo(todo.id, !todo.complete)}
      >
        complete
      </button>
    </div>
  ));

  return (
    <main className="main">
      <h1 className="heading">My Todos</h1>
      <div className="input-div">
        <p>name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>description</p>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div className="todosDiv">{todosDiv}</div>
    </main>
  );
}
