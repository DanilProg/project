import classes from "./Product.module.css";
import { ChangeEvent } from "react";
import { Radio } from "../Radio/Radio.tsx";

interface Category {
  category: string;
  setCategory: (value: "asc" | "desc") => void;
}
export const Category = ({ setCategory, category }: Category) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sort = e.target.value === "asc" ? "asc" : "desc";
    setCategory(sort);
  };
  const isChecked = (value: string) => value === category;
  return (
    <div className={classes.category}>
      <Radio
        label={"По возрастанию цены"}
        value={"asc"}
        onChange={handleChange}
        checked={isChecked("asc")}
      />
      <Radio
        label={"По убыванию цены"}
        value={"desc"}
        onChange={handleChange}
        checked={isChecked("desc")}
      />
    </div>
  );
};
