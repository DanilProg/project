import {
  IProduct,
  ProductList,
} from "../../components/Product/ProductList.tsx";
import { useState } from "react";
import { Button } from "../../components/Button/Button.tsx";
import { Input } from "../../components/Input/Input.tsx";
import classes from "../../components/Product/Product.module.css";
import { Popup } from "../../components/Popup/Popup.tsx";
import { IOption } from "../../components/Select/Select.tsx";
import { Filter } from "../../components/Product/Filter.tsx";
import { Category } from "../../components/Product/Category.tsx";
import { productConst } from "../../components/Product/productConst.ts";

export const typeProduct: IOption[] = [
  { value: "food", label: "Еда" },
  { value: "tech", label: "Техника" },
  { value: "sport", label: "Спорт" },
  { value: "", label: "По умолчанию" },
];
export const ProductPage = () => {
  const [selectedValue, setSelectedValue] = useState<IProduct | null>(null);
  const [products, setProducts] = useState<IProduct[]>(productConst);
  const [search, setSearch] = useState("");
  const [valueSelect, setValueSelect] = useState<IOption>({
    value: "",
    label: "По умолчанию",
  });
  const [valueDesc, setValueDesc] = useState("");
  const [category, setCategory] = useState<"asc" | "desc">("asc");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  return (
    <div className={"container"}>
      <div className={classes.header}>
        <Button
          variant={"primary"}
          onClick={() =>
            setSelectedValue({
              price: "",
              description: "",
              title: "",
              image: "",
            })
          }
        >
          Добавить продукт
        </Button>
        <Input
          variant={"outline"}
          label={"Поиск"}
          name={"search"}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Popup
          placement={"right"}
          onContent={
            <Filter
              setValueSelect={setValueSelect}
              valueSelect={valueSelect}
              setValueDesc={setValueDesc}
              setPage={setPage}
            />
          }
        >
          <Button variant={"outline"}>Открыть фильтры</Button>
        </Popup>
        <Category category={category} setCategory={setCategory} />
      </div>
      <ProductList
        pageSize={pageSize}
        setPageSize={setPageSize}
        page={page}
        setPage={setPage}
        valueSelect={valueSelect}
        category={category}
        valueDesc={valueDesc}
        search={search}
        setProducts={setProducts}
        products={products}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
    </div>
  );
};
