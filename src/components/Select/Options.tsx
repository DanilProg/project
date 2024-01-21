import classes from "./Select.module.css";
import { IOption } from "./Select.tsx";
import classNames from "classnames";
import { CSSProperties, LegacyRef } from "react";

interface OptionsProps {
  style: CSSProperties;
  options: IOption[];
  setIsOpen: (value: IOption) => void;
  contentRef: LegacyRef<HTMLDivElement>;
}
export const Options = ({
  style,
  options,
  contentRef,
  setIsOpen,
}: OptionsProps) => {
  return (
    <div
      ref={contentRef}
      className={classNames(classes.optionsContainer)}
      style={{
        transform: `translate3d(${style.left}px, ${style.top}px, 0)`,
        width: style.width,
      }}
    >
      <ul className={classes.options}>
        {options.map((option) => (
          <li
            className={classes.option}
            key={option.value}
            onClick={() => setIsOpen(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
