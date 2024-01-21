import { Input } from "../Input/Input.tsx";
import classes from "./Form.module.css";
import { Button } from "../Button/Button.tsx";

export const Form = () => {
  return (
    <form>
      <div className={classes.formFields}>
        <Input variant={"primary"} />
        <Input variant={"primary"} />
        <Input variant={"primary"} />
      </div>
      <div className={classes.formFields}>
        <Input variant={"primary"} />
        <Input variant={"primary"} />
        <Input variant={"primary"} />
      </div>
      <div className={classes.formFields}>
        <Input variant={"primary"} />
        <Input variant={"primary"} />
        <Input variant={"primary"} />
      </div>
      <Button variant={"primary"}>Сделки</Button>
      <Button variant={"outline"}>Очистить все</Button>
    </form>
  );
};
