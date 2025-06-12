import React, { useCallback } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addTodo } from "@/features/todo/todoSlice";
import Input from "../input/Input";
import "./Header.css";
import { useAppSelector } from "@/hooks/useAppSelector";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector((state) => state.todo);

  const remainingTodos = todo.todos.filter((todo) => !todo.completed).length;

  const addItem = useCallback(
    (title: string) =>
      dispatch(addTodo({ title, description: "no description" })),
    [dispatch]
  );

  return (
    <header className="header" data-testid="header">
      <h1>Hi, Farisani</h1>
      <p>You currently have {remainingTodos} pending {remainingTodos <= 1 ? "task" : "tasks"}!</p>
      <Input
        onSubmit={addItem}
        placeholder="What needs to be done?"
        onBlur={() => {}}
        defaultValue={undefined}
        showSearch={true}
      />
      {/* <button>
        <img src="" />
      </button> */}
    </header>
  );
};

export default Header;
