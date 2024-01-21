import { Input } from "../Input/Input.tsx";
import classes from "../FormRegistr/FormRegistr.module.css";
import { Button } from "../Button/Button.tsx";
import { ChangeEvent, FormEvent, useState } from "react";
type FormKey = "login" | "password";
type FormObject = {
  [key in FormKey]: string;
};
export const FormAuth = () => {
  const [value, setValue] = useState({ login: "", password: "" });
  const [errorMessage, setErrorMessage] = useState({
    errorLogin: "",
    errorPassword: "",
  });
  const validationAuth = (formValue: FormObject) => {
    const errorMessage = { errorLogin: "", errorPassword: "" };
    if (formValue.login.length < 3) {
      errorMessage.errorLogin = "Логин должен содержать не менее 3 символов";
    }
    if (formValue.password.length < 8) {
      errorMessage.errorPassword =
        "Пароль должен содержать не менее 8 символов";
    }
    return errorMessage;
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formInputValue: FormObject = { login: "", password: "" };
    for (const data of formData) {
      formInputValue[data[0] as FormKey] = data[1] as string;
    }
    if (value.login && value.password) {
      const validationMessage = validationAuth(formInputValue);
      setErrorMessage(validationMessage);
    }
    return "";
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.formInner}>
        <Input
          variant={"outline"}
          label={"Логин"}
          name={"login"}
          type={"text"}
          onChange={onChange}
          errorMessage={errorMessage.errorLogin}
          className={classes.formField}
        ></Input>
        <Input
          variant={"ghost"}
          label={"Пароль"}
          name={"password"}
          type={"password"}
          onChange={onChange}
          errorMessage={errorMessage.errorPassword}
          className={classes.formField}
        ></Input>
        <Button variant={"primary"} type={"submit"}>
          Войти
        </Button>
      </div>
    </form>
  );
};
