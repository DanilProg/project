import { Input } from "../Input/Input.tsx";
import classes from "./Calculate.module.css";
import { ChangeEvent, useState } from "react";
import { Button } from "../Button/Button.tsx";
interface ExpressionsCalculate {
  firstNumber: number;
  expressions: string;
  lastNumber: number;
  result: number;
}
export const Calculate = () => {
  const expressions = ["/", "+", "-", "*"];
  const [calculate, setCalculate] = useState<ExpressionsCalculate>({
    firstNumber: 0,
    expressions: "",
    lastNumber: 0,
    result: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCalculate({ ...calculate, [e.target.name]: +e.target.value });
  };
  const handleExpressions = (
    firstNumber: number,
    expressions: string,
    lastNumber: number,
  ) => {
    switch (expressions) {
      case "+":
        setCalculate({ ...calculate, result: firstNumber + lastNumber });
        break;
      case "-":
        setCalculate({ ...calculate, result: firstNumber - lastNumber });
        break;
      case "*":
        setCalculate({ ...calculate, result: firstNumber * lastNumber });
        break;
      case "/":
        setCalculate({ ...calculate, result: firstNumber / lastNumber });
        break;
      default:
        setErrorMessage("Нормально общайся");
        break;
    }
  };
  return (
    <div className={classes.calculate}>
      <div className={classes.calculateInner}>
        <Input
          label={"Введите первое значение"}
          variant={"outline"}
          type={"number"}
          name={"firstNumber"}
          onChange={onChange}
        ></Input>
        {expressions.map((exp) => (
          <Button
            variant={"outline"}
            name={exp}
            key={exp}
            onClick={() => setCalculate({ ...calculate, expressions: exp })}
          >
            {exp}
          </Button>
        ))}
        <Input
          label={"Введите второе значение"}
          name={"lastNumber"}
          variant={"outline"}
          onChange={onChange}
        ></Input>
        <Button
          variant={"primary"}
          onClick={() =>
            handleExpressions(
              calculate.firstNumber,
              calculate.expressions,
              calculate.lastNumber,
            )
          }
        >
          Рассчитать
        </Button>
        <Input
          variant={"outline"}
          label={"Результат"}
          name={"result"}
          value={calculate.result}
          onChange={onChange}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};
