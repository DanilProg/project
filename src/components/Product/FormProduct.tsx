import { Input } from "../Input/Input.tsx";
import classes from "./Product.module.css";
import { ChangeEvent, FormEvent } from "react";
import { Button } from "../Button/Button.tsx";
import { IOption, Select } from "../Select/Select.tsx";
import { typeProduct } from "../../pages/ProductPage/ProductPage.tsx";
import { IProduct } from "./ProductList.tsx";
interface INewFormProduct {
  value: IProduct;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setValue: (value: IProduct) => void;
}
export const FormProduct = ({ value, setValue, onSubmit }: INewFormProduct) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const onSelectChange = (option: IOption, name: string) => {
    setValue({ ...value, [name]: option });
  };
  return (
    <form className={classes.formProduct} onSubmit={onSubmit}>
      <div>
        <Input
          variant={"outline"}
          name={"image"}
          value={value.image}
          onChange={onChange}
          label={"Вставьте ссылку картинки"}
          className={classes.inputProduct}
        />
        <Input
          variant={"outline"}
          name={"title"}
          value={value.title}
          onChange={onChange}
          label={"Наименование товара"}
        />
        <Input
          variant={"outline"}
          name={"price"}
          value={value.price}
          onChange={onChange}
          label={"Цена товара"}
        />
        <Input
          variant={"outline"}
          name={"description"}
          value={value.description}
          onChange={onChange}
          label={"Описание товара"}
        />
        <Select
          options={typeProduct}
          onChange={(option) => onSelectChange(option, "type")}
          value={value.type}
        ></Select>
      </div>
      <div>
        <Button variant={"outline"} type={"submit"}>
          Сохранить
        </Button>
      </div>
    </form>
  );
};
