import { useCallback, type KeyboardEvent } from "react";

const sanitize = (value: string) => {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return value.replace(reg, (match: string | number) => map[match]);
};

const hasValidMin = (value: string, min: number) => {
  return value.length >= min;
};

interface InputProps {
  onSubmit: (value: string) => void;
  placeholder: string;
  label: string;
  defaultValue: string;
  onBlur: () => void;
}

const Input: React.FC<InputProps> = ({
  onSubmit,
  placeholder,
  label,
  defaultValue,
  onBlur,
}) => {
  const handleBlur = useCallback(() => {
    if (onBlur) onBlur();
  }, [onBlur]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const inputValue = e.currentTarget.value.trim();

        if (!hasValidMin(inputValue, 2)) return;

        onSubmit(sanitize(inputValue));
        e.currentTarget.value = "";
      }
    },
    [onSubmit]
  );

  return (
    <div className="input-container">
      <input
        className="new-todo"
        id="todo-input"
        type="text"
        data-testid="text-input"
        autoFocus
        placeholder={placeholder}
        defaultValue={defaultValue}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <label className="visually-hidden" htmlFor="todo-input">
        {label}
      </label>
    </div>
  );
};

export default Input;
