import { HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";
import classes from "./AppLink.module.css";

interface AppLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}
export const AppLink = ({ children, className, ...props }: AppLinkProps) => {
  return (
    <a {...props} className={classNames(classes.link, className)}>
      {children}
    </a>
  );
};
