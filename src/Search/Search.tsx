import { useEffect, useRef, useState } from "react";
import s from "./style.module.scss";
import cn from "classnames";

export const Search = ({
  setSearchString,
}: {
  setSearchString: (arg: string) => void;
}) => {
  const [string, setString] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setVisible((v) => {
          const nextValue = !v;
          if (!nextValue && inputRef.current) {
            setString("");
            setSearchString("");
          }
          return nextValue;
        });
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      setVisible(false);
    };
  }, []);
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "enter") {
        e.preventDefault();
        btnRef.current?.click();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);
  const onSearch = () => {
    if (string) setSearchString(string);
  };
  return (
    <div
      className={cn(s.searchContainer, { [s.searchContainerVisible]: visible })}
    >
      <input
        value={string}
        className={s.searchField}
        ref={inputRef}
        type="text"
        placeholder="Поиск по сайту..."
        onChange={(e) => setString(e.target.value)}
      />
      <button ref={btnRef} onClick={onSearch} className={s.searchBtn}>
        Поиск
      </button>
    </div>
  );
};
