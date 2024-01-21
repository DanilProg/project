import { ITab } from "../Tabs.tsx";
import classes from "./TabBar.module.css";
import classNames from "classnames";
interface TabBarProps {
  tabs: ITab[];
  active: null | string;
  setActive: (value: string | null) => void;
}
export const TabBar = ({ tabs, active, setActive }: TabBarProps) => {
  return (
    <div className={classes.tabs}>
      {tabs.map((tab) => (
        <p
          onClick={() => setActive(tab.key)}
          key={tab.key}
          className={classNames(classes.tabsTitle, {
            [classes.active]: tab.key === active,
          })}
        >
          {tab.title}
        </p>
      ))}
    </div>
  );
};
