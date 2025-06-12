import { useCallback, useState, type KeyboardEvent } from "react";
import classnames from "classnames";
import "./Input.css";
import Search from "@/assets/search.svg";

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
  defaultValue: string | number | undefined;
  onBlur: () => void;
}

const Input: React.FC<InputProps> = ({
  onSubmit,
  placeholder,
  label,
  defaultValue,
  onBlur,
}) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleBlur = useCallback(() => {
    if (onBlur) {
      setIsTyping(false);
      onBlur();
    }
  }, [onBlur]);

  const handleFocus = useCallback(() => {
    setIsTyping(true);
  }, [isTyping])

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
    <div className={classnames("input-container", { typing: isTyping })}>
      <img src={Search} />
      <input
        className="new-todo"
        type="text"
        data-testid="text-input"
        autoFocus
        placeholder={placeholder}
        defaultValue={defaultValue}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Input;
