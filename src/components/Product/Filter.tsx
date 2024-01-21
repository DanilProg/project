import { IOption, Select } from "../Select/Select.tsx";
import { typeProduct } from "../../pages/ProductPage/ProductPage.tsx";
import { Input } from "../Input/Input.tsx";
import classes from "./Product.module.css";

interface Filter {
  valueSelect?: IOption;
  setValueSelect: (value: IOption) => void;
  setValueDesc: (value: string) => void;
  setPage: (value: number) => void;
}
export const Filter = ({
  setValueSelect,
  valueSelect,
  setPage,
  setValueDesc,
}: Filter) => {
  return (
    <div className={classes.filter}>
      <Select
        onChange={(e) => {
          setValueSelect(e);
          setPage(0);
        }}
        value={valueSelect}
        className={classes.filterSelect}
        options={typeProduct}
      ></Select>
      <Input
        variant={"outline"}
        label={"По описанию"}
        onChange={(e) => {
          setValueDesc(e.target.value);
          setPage(0);
        }}
      />
    </div>
  );
};
