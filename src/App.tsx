import { useState } from "react";
import s from "./App.module.scss";
import cn from "classnames";

function App() {
  const [firstLine, setFirstLine] = useState<string>();
  const [secondLine, setSecondLine] = useState<string>();
  const [warning, setWarning] = useState<boolean>(false);
  const handleInput =
    (line: "first" | "second") => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (line === "first") {
        setFirstLine(e.target.value);
      }
      if (line === "second") {
        setSecondLine(e.target.value);
      }
      if (secondLine?.length !== firstLine?.length) {
        setWarning(true);
      } else {
        setWarning(false);
      }
    };
  return (
    <div className={s.container}>
      <div className={s.inputsContainer}>
        <input
          value={firstLine}
          onChange={handleInput("first")}
          className={s.input}
        />
        <input
          value={secondLine}
          onChange={handleInput("second")}
          className={s.input}
        />
      </div>
      <div className={s.warningContainer}>
        {warning && (
          <div className={s.warningText}>
            Длина введенных последовательностей различна
          </div>
        )}
      </div>
      <div className={s.resultContainer}>
        <div className={s.resultFirstLine}>
          {firstLine?.split("").map((i) => (
            <span className={cn(s[`${i.toUpperCase()}`], s.firstLineLetter)}>
              {i}
            </span>
          ))}
        </div>
        <div className={s.resultSecondLine}>
          {secondLine?.split("").map((i, index) => {
            console.log(
              ">>",
              i.toLowerCase(),
              ">",
              firstLine?.charAt(index),
              "index",
              index
            );
            if (i.toLowerCase() !== firstLine?.charAt(index)) {
              return (
                <span
                  className={cn(s[`${i.toUpperCase()}`], s.firstLineLetter)}
                >
                  {i}
                </span>
              );
            } else {
              return <span className={s.secondLineLetter}>{i}</span>;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
