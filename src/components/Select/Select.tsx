import classes from "./Select.module.css";
import { useState } from "react";
import classNames from "classnames";
import { Options } from "./Options.tsx";
import { Portal } from "../Portal/Portal.tsx";
import { Arrow } from "./Arrow.tsx";
import { useCalcCords } from "./useCalcCords.ts";

export interface IOption {
  value: string;
  label: string;
}
interface SelectProps {
  options: IOption[];
  onChange: (value: IOption) => void;
  value?: IOption;
  className?: string;
}
export const Select = ({
  options,
  onChange,
  value,
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectRef, contentRef, position } = useCalcCords(isOpen);
  const toggleSelect = (value: IOption) => {
    setIsOpen(!isOpen);
    onChange(value);
  };
  return (
    <div className={classNames(classes.container, className)} ref={selectRef}>
      <div className={classes.selectInner}>
        <input
          className={classes.select}
          value={value?.label}
          readOnly={true}
        />
      </div>
      <div
        className={classNames(classes.caret, { [classes.caretActive]: isOpen })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Arrow />
      </div>
      {isOpen && (
        <Portal>
          <Options
            options={options}
            contentRef={contentRef}
            setIsOpen={toggleSelect}
            style={position}
          />
        </Portal>
      )}
    </div>
  );
};
