import { useEffect, useState } from "react";
import s from "./App.module.scss";
import cn from "classnames";
import { Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Search } from "./Search/Search";
import { findAllIndexes } from "./helpers";

function App() {
  const [firstLine, setFirstLine] = useState<string>();
  const [secondLine, setSecondLine] = useState<string>();
  const [searchString, setSearchString] = useState<string>();
  const [subStringFirstLineIndexies, setSubStringFirstLineIndexies] = useState<
    number[]
  >([]);
  const [subStringSecondLineIndexies, setSubStringSecondLineIndexies] =
    useState<number[]>([]);
  const { handleSubmit, control, clearErrors, setError } = useForm();
  const onSubmit = (data: any) => {
    const { firstLine, secondLine } = data;
    clearErrors();
    resetSearchData();
    if (firstLine.length !== secondLine.length) {
      const message = "Длины строк не совпадают";
      setError("firstLine", { type: "manual", message });
      setError("secondLine", { type: "manual", message });
      return;
    }
    setFirstLine(firstLine);
    setSecondLine(secondLine);
  };

  useEffect(() => {
    if (firstLine && searchString) {
      const indexies = findAllIndexes(firstLine, searchString);
      setSubStringFirstLineIndexies(indexies);
    }
    if (secondLine && searchString) {
      const indexies = findAllIndexes(secondLine, searchString);
      setSubStringSecondLineIndexies(indexies);
    }
    if (!searchString) {
      setSubStringFirstLineIndexies([]);
      setSubStringSecondLineIndexies([]);
    }
  }, [searchString, firstLine, secondLine]);
  const resetSearchData = () => {
    setSearchString("");
    setSubStringFirstLineIndexies([]);
    setSubStringSecondLineIndexies([]);
  };
  return (
    <>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.container}>
          <div className={s.inputsContainer}>
            <Controller
              name="firstLine"
              control={control}
              defaultValue=""
              rules={{
                required: "Это поле обязательно",
                pattern: {
                  value: /^[ARNDCEQGHILKMFPSTWYV-]+$/i,
                  message: "Только латинские символы аминокислот и '-'",
                },
              }}
              render={({ field, fieldState }) => (
                <div className={s.inputContainer}>
                  <TextField
                    {...field}
                    error={!!fieldState.error}
                    className={s.input}
                    required
                    label="Первая строка"
                    maxRows={1}
                    name="firstLine"
                    placeholder="Введите данные"
                    helperText={fieldState.error?.message}
                  />
                </div>
              )}
            />
            <Controller
              name="secondLine"
              control={control}
              defaultValue=""
              rules={{
                required: "Это поле обязательно",
                pattern: {
                  value: /^[ARNDCEQGHILKMFPSTWYV-]+$/i,
                  message: "Только латинские символы аминокислот и '-'",
                },
              }}
              render={({ field, fieldState }) => (
                <div className={s.inputContainer}>
                  <TextField
                    {...field}
                    error={!!fieldState.error}
                    className={s.input}
                    required
                    label="Вторая строка"
                    maxRows={1}
                    name="secondLine"
                    placeholder="Введите данные"
                    helperText={fieldState.error?.message}
                  />
                </div>
              )}
            />
          </div>
          <div className={s.submitContainer}>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Анализ
            </Button>
          </div>
          <div className={s.resultContainer}>
            {firstLine?.split("").map((i, index) => (
              <div key={index} className={s.resultLetterRow}>
                <div
                  className={cn(s.resultFirstLineLetter, {
                    [s.resultFirstLineLetterSelected]:
                      subStringFirstLineIndexies.includes(index),
                  })}
                >
                  <span
                    className={cn(s[`${i.toUpperCase()}`], s.firstLineLetter)}
                  >
                    {i}
                  </span>
                </div>

                <div
                  className={cn(s.resultSecondLineLetter, {
                    [s.resultSecondLineLetterSelected]:
                      subStringSecondLineIndexies.includes(index),
                  })}
                >
                  {i.toLowerCase() !== secondLine?.charAt(index) ? (
                    <span
                      className={cn(
                        s[`${secondLine?.charAt(index).toUpperCase()}`],
                        s.firstLineLetter
                      )}
                    >
                      {secondLine?.charAt(index)}
                    </span>
                  ) : (
                    <span className={s.secondLineLetter}>
                      {secondLine?.charAt(index)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
      <Search setSearchString={setSearchString} />
    </>
  );
}

export default App;
