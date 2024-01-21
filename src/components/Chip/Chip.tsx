import { HTMLAttributes, ReactNode } from "react";
import classes from "./Chip.module.css";
import classNames from "classnames";
import { Variant } from "../../App.tsx";

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant: Variant;
}
export const Chip = ({ children, variant, className, ...props }: ChipProps) => {
  return (
    <div
      {...props}
      className={classNames(classes.chip, classes[variant], className)}
    >
      {children}
    </div>
  );
};
