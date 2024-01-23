import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import classNames from "classnames";
import { useState } from "react";

export const Header = () => {
  const [active, setActive] = useState(false);
  return (
    <div className={"container"}>
      <div className={classes.header}>
        <nav>
          <NavLink
            to={"/"}
            className={classNames(classes.link, classes.active && active)}
            onClick={() => setActive(!active)}
          >
            Главная
          </NavLink>
          <NavLink
            to={"/products"}
            className={classNames(classes.link, classes.active && active)}
            onClick={() => setActive(!active)}
          >
            Продукты
          </NavLink>
          <NavLink to={"/calculate"} className={classes.link}>
            Калькулятор
          </NavLink>
        </nav>
      </div>
    </div>
  );
};
