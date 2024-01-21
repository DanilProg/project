import { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./Button.module.css";
import classNames from "classnames";
import { Variant } from "../../App.tsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant: Variant;
}
export const Button = ({
  variant,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(classes.button, classes[variant], className)}
    >
      {children}
    </button>
  );
};
