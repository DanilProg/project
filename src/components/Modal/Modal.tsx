import classes from "./Modal.module.css";
import { HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";
import { Portal } from "../Portal/Portal.tsx";
interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  active: boolean;
  onClose: () => void;
}
export const Modal = ({
  children,
  onClose,
  active,
  className,
  ...props
}: ModalProps) => {
  if (!active) {
    return null;
  }
  return (
    <Portal>
      <div
        {...props}
        className={classNames(
          classes.modal,
          { [classes.active]: active },
          className,
        )}
        onClick={() => onClose()}
      >
        <div
          className={classNames(classes.modalContent, {
            [classes.activeContent]: active,
          })}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
