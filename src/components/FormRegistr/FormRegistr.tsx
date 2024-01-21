import { Input } from "../Input/Input.tsx";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../Button/Button.tsx";
import classes from "./FormRegistr.module.css";
import { parsePhoneNumber } from "libphonenumber-js";

export const FormRegister = () => {
  const [value, setValue] = useState({ login: "", password: "", phone: "" });
  const [errorMessage, setErrorMessage] = useState({
    errorLogin: "",
    errorPassword: "",
    errorPhone: "",
  });
  const validationRegister = (
    phone: string,
    password: string,
    login: string,
  ) => {
    const errorMessage = {
      errorLogin: "",
      errorPassword: "",
      errorPhone: "",
    };
    if (phone.length) {
      const result = parsePhoneNumber(phone, { defaultCountry: "RU" });
      if (!result.isValid()) {
        errorMessage.errorPhone = "Неккоретный номер";
      }
    }
    if (password.length < 8) {
      errorMessage.errorPassword =
        "Пароль должен содержать не менее 8 символов";
    }
    if (login.length < 3) {
      errorMessage.errorLogin = "Логин должен содержать не менее 3 символов";
    }
    return errorMessage;
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.phone && value.password && value.login) {
      const validationMessage = validationRegister(
        value.phone.replace(/\D/g, "").replace(/^7/, "8"),
        value.password,
        value.login,
      );
      setErrorMessage(validationMessage);
      if (
        !validationMessage.errorLogin ||
        !validationMessage.errorPassword ||
        !validationMessage.errorPhone
      ) {
        return console.log("Отправка");
      }
    }
    alert("Не все поля заполнены");
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.formInner}>
        <Input
          variant={"primary"}
          label={"Логин"}
          name={"login"}
          type={"text"}
          errorMessage={errorMessage.errorLogin}
          onChange={onChange}
          className={classes.formField}
        ></Input>
        <Input
          variant={"primary"}
          label={"Телефон"}
          name={"phone"}
          type={"tel"}
          onChange={onChange}
          errorMessage={errorMessage.errorPhone}
          className={classes.formField}
        ></Input>
        <Input
          variant={"primary"}
          label={"Пароль"}
          name={"password"}
          type={"password"}
          onChange={onChange}
          errorMessage={errorMessage.errorPassword}
          className={classes.formField}
        ></Input>
        <Button variant={"primary"} type={"submit"}>
          Отправить
        </Button>
      </div>
    </form>
  );
};
/* const { passwordMessage, phoneMessage, loginMessage } = useValidation(value);*/
