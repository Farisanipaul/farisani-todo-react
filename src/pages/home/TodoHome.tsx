import React, { useCallback, useEffect, useMemo } from "react";
import "./TodoHome.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import { useAppSelector } from "@/hooks/useAppSelector";
import TodoItem from "@/features/todo/TodoItem";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getTodoFilter,
  getTodos,
  toggleAllTodos,
} from "@/features/todo/todoSlice";

const TodoHome: React.FC = () => {
  const { pathname: route } = useLocation();
  console.log("Printing from true route: ", route);
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
        console.log("Printing route: ", route);
        if (filter === "active") return !todo.completed;

        if (filter === "completed") return todo.completed;

        return todo;
      }),
    [todo, route]
  );

  const toggleAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(toggleAllTodos({ completed: e.target.checked }));
    },
    [dispatch]
  );

  return (
    <>
      <Header />
      <main className="main" data-testid="main">
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
      <Footer />
    </>
  );
};

export default TodoHome;
