import classNames from "classnames";
import classes from "./Popup.module.css";
import { CSSProperties, HTMLAttributes, LegacyRef, ReactNode } from "react";
interface PopupContentProps extends HTMLAttributes<HTMLDivElement> {
  onContent: ReactNode;
  style: CSSProperties;
  contentRef: LegacyRef<HTMLDivElement>;
}
export const PopupContent = ({
  contentRef,
  onContent,
  className,
  style,
  ...props
}: PopupContentProps) => {
  return (
    <div
      {...props}
      className={classNames(classes.popup, className)}
      style={style}
      ref={contentRef}
      onClick={(e) => e.stopPropagation()}
    >
      {onContent}
    </div>
  );
};
