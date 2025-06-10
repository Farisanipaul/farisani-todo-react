import { memo, useState, useCallback } from "react";
import classnames from "classnames";
import Input from "@/components/input/Input";
import type { Todo } from "@/types/todo";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { removeTodo, toggleTodo, updateTodo } from "./todoSlice";
import "./TodoItem.css";

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const [isWritable, setIsWritable] = useState(false);

  const { title, completed, id } = todo;

  const toggleItem = useCallback(() => {
    console.log("Toggling item: ");
    dispatch(toggleTodo({ id }));
  }, [dispatch]);
  const removeItem = useCallback(
    () => dispatch(removeTodo({ id })),
    [dispatch]
  );
  const updateItem = useCallback(
    (id: string, title: string) => dispatch(updateTodo({ id, title })),
    [dispatch]
  );

  const handleDoubleClick = useCallback(() => {
    setIsWritable(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsWritable(false);
  }, []);

  const handleUpdate = useCallback(
    (title: string) => {
      if (title.length === 0) removeItem();
      else updateItem(id, title);

      setIsWritable(false);
    },
    [id, removeItem, updateItem]
  );

  return (
    <li className="todo-container">
      <div className="item">
        {isWritable ? (
          <Input
            onSubmit={handleUpdate}
            label="Edit Todo Input"
            defaultValue={title}
            onBlur={handleBlur}
            placeholder={""}
          />
        ) : (
          <>
            <input
              className="toggle"
              type="checkbox"
              data-testid="todo-item-toggle"
              checked={completed}
              onChange={toggleItem}
            />
            <label
              data-testid="todo-item-label"
              onDoubleClick={handleDoubleClick}
            >
              {title}
            </label>
            <button
              className="destroy"
              data-testid="todo-item-button"
              onClick={removeItem}
            />
          </>
        )}
      </div>
    </li>
  );
};

export default memo(TodoItem);
