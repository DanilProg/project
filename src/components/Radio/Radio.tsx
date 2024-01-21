import classNames from "classnames";
import { InputHTMLAttributes } from "react";
import classes from "./Radio.module.css";
interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const Radio = ({ label, name, className, ...props }: RadioProps) => {
  return (
    <div className={classNames(classes.radio, className)}>
      <label>
        <input
          {...props}
          type={"radio"}
          name={name}
          className={classes.radioButton}
        />
        <span className={classes.text}>{label}</span>
      </label>
    </div>
  );
};
