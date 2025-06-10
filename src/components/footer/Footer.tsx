import { useCallback, useEffect, useMemo } from "react";
import classnames from "classnames";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getTodoFilter,
  getTodos,
  removeCompletedTodos,
  setActiveFilter,
} from "@/features/todo/todoSlice";
import type { TodoFilter } from "@/types/todo";
import "./Footer.css";

const Footer: React.FC = () => {
  const todo = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (todo.status === "loading") {
      dispatch(getTodos());
    }

    if (todo.filterStatus === "loading") {
      dispatch(getTodoFilter());
    }
  }, [todo]);

  const activeTodos = useMemo(
    () => todo.todos.filter((todo) => !todo.completed),
    [todo]
  );

  const handleFilterClick = (filter: TodoFilter) => {
    dispatch(setActiveFilter(filter));
  };

  const removeCompleted = useCallback(
    () => dispatch(removeCompletedTodos()),
    [dispatch]
  );

  // prettier-ignore
  if (todo.todos.length === 0)
        return null;

  return (
    <footer className="footer" data-testid="footer">
      <span className="todo-count">{`${activeTodos.length} ${
        activeTodos.length === 1 ? "item" : "items"
      } left!`}</span>
      <ul className="filters" data-testid="footer-navigation">
        <li>
          <button
            className={classnames({ selected: todo.filter === "all" })}
            onClick={() => handleFilterClick("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={classnames({ selected: todo.filter === "active" })}
            onClick={() => handleFilterClick("active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={classnames({ selected: todo.filter === "completed" })}
            onClick={() => handleFilterClick("completed")}
          >
            Completed
          </button>
        </li>
      </ul>
      <button
        className="clear-completed"
        disabled={activeTodos.length === todo.todos.length}
        onClick={removeCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
