import { InputHTMLAttributes } from "react";
import classes from "./Input.module.css";
import classNames from "classnames";
import { Variant } from "../../App.tsx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  variant: Variant;
}
export const Input = ({
  label,
  errorMessage,
  className,
  variant,
  ...props
}: InputProps) => {
  return (
    <div className={classNames(classes.inputField, className)}>
      <label className={classes.label}>{label}</label>
      <input
        {...props}
        className={classNames(classes.input, classes[variant], {
          [classes.inputError]: errorMessage,
        })}
      />
      <p className={classes.errorText}>{errorMessage}</p>
    </div>
  );
};
