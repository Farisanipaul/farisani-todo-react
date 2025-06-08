import React, { useCallback } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addTodo } from "@/features/todo/todoSlice";
import Input from "../input/Input";
import "./Header.css";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const addItem = useCallback(
    (title: string) =>
      dispatch(addTodo({ title, description: "no description" })),
    [dispatch]
  );

  return (
    <header className="header" data-testid="header">
      <h1>todos</h1>
      <Input
        onSubmit={addItem}
        label="New Todo Input"
        placeholder="What needs to be done?"
        defaultValue="Type title..."
        onBlur={() => {}}
      />
      {/* <button>
        <img src="" />
      </button> */}
    </header>
  );
};

export default Header;
