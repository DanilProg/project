import classes from "./Checkbox.module.css";
import classNames from "classnames";
import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const Checkbox = ({ label, className, ...props }: CheckboxProps) => {
  return (
    <label className={classNames(classes.checkbox__field, className)}>
      {label}
      <input
        {...props}
        type={"checkbox"}
        className={classNames(classes.check__input)}
      />
      <span className={classes.checkbox}></span>
    </label>
  );
};
