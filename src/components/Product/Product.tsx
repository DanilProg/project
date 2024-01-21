import classes from "./Product.module.css";
import { Button } from "../Button/Button.tsx";

import { Typography } from "../Typography/Typography.tsx";
import { IProduct } from "./ProductList.tsx";
import { LegacyRef } from "react";
export interface IFormProduct {
  value: IProduct;
  onEdit: () => void;
  productItemRef: LegacyRef<HTMLDivElement>;
  indexElement: number;
}
export const Product = ({
  value,
  onEdit,
  productItemRef,
  indexElement,
}: IFormProduct) => {
  return (
    <div
      className={classes.productItem}
      ref={indexElement === 4 ? productItemRef : null}
    >
      <div className={classes.productImage}>
        <img
          alt={"image product"}
          src={value.image}
          className={classes.productImage}
        />
      </div>
      <div>
        <div>
          <Typography Component={"h3"} variant={"h3"} className={classes.title}>
            Наименование товара
          </Typography>
          <Typography Component={"p"} variant={"h3"} className={classes.text}>
            {value.title}
          </Typography>
        </div>
        <div>
          <Typography Component={"h3"} variant={"h3"} className={classes.title}>
            Цена товара
          </Typography>
          <Typography Component={"p"} variant={"h4"} className={classes.text}>
            {value.price} руб
          </Typography>
        </div>
        <div>
          <Typography Component={"h3"} variant={"h3"} className={classes.title}>
            Описание товара
          </Typography>
          <Typography Component={"p"} variant={"h3"} className={classes.text}>
            {value.description}
          </Typography>
        </div>
        <Button variant={"outline"} onClick={onEdit}>
          Редактировать
        </Button>
      </div>
    </div>
  );
};
