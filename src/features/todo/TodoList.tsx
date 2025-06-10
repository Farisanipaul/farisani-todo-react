import React, { useCallback, useEffect, useMemo } from "react";
import { getTodoFilter, getTodos, toggleAllTodos } from "./todoSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import TodoItem from "./TodoItem";
import classnames from "classnames";
import "./TodoList.css";

export const TodoList: React.FC = () => {
  const todo = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  const { filter } = todo;

  useEffect(() => {
    if (todo.status === "loading") {
      dispatch(getTodos());
    }

    if (todo.filterStatus === "loading") {
      dispatch(getTodoFilter());
    }
  }, [todo]);

  const visibleTodos = useMemo(
    () =>
      todo.todos.filter((todo) => {
        if (filter === "active") return !todo.completed;

        if (filter === "completed") return todo.completed;

        return todo;
      }),
    [todo]
  );

  const toggleAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(toggleAllTodos({ completed: e.target.checked }));
    },
    [dispatch]
  );
  return (
    <main className="todo-list-container" data-testid="main">
      {visibleTodos.length > 0 ? (
        <div className="toggle-all-container">
          <input
            className="toggle-all"
            type="checkbox"
            id="toggle-all"
            data-testid="toggle-all"
            checked={visibleTodos.every((todo) => todo.completed)}
            onChange={toggleAll}
          />
          <label className="toggle-all-label" htmlFor="toggle-all">
            Toggle All Input
          </label>
        </div>
      ) : null}
      <ul className={classnames("todo-list")} data-testid="todo-list">
        {visibleTodos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </main>
  );
};
