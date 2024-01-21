import { Link } from "react-router-dom";
import classes from "./Header.module.css";

export const Header = () => {
  return (
    <div className={"container"}>
      <div className={classes.header}>
        <nav>
          <Link to={"/"}>Главная</Link>
          <Link to={"/products"}>Продукты</Link>
        </nav>
      </div>
    </div>
  );
};
