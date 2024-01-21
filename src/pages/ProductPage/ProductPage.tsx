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

export const typeProduct: IOption[] = [
  { value: "food", label: "Еда" },
  { value: "tech", label: "Техника" },
  { value: "sport", label: "Спорт" },
  { value: "", label: "По умолчанию" },
];
export const ProductPage = () => {
  const [selectedValue, setSelectedValue] = useState<IProduct | null>(null);
  const [products, setProducts] = useState<IProduct[]>([
    {
      image:
        "https://p.turbosquid.com/ts-thumb/ce/Ia8pal/6rY45nqc/01/jpg/1425364969/1920x1080/fit_q99/e460897bff0d1d2281ff9047a71cb574d6dc35b1/01.jpg",
      title: "Башня",
      price: "12323",
      description: "Отлитчный товар бэри",
      type: { label: "Техника", value: "tech" },
      id: "1",
    },
    {
      image: "https://rasekhoon.net/_files/images/photogallery/dessert(32).jpg",
      title: "Пирог",
      price: "1123",
      description: "Товар производства не на ебем",
      type: { label: "Еда", value: "food" },
      id: "2",
    },
    {
      image: "",
      title: "Компуктер",
      price: "23",
      description: "Техника двигатель",
      type: { label: "Техника", value: "tech" },
      id: "3",
    },
    {
      image: "https://i.ytimg.com/vi/PHDGZTByElw/maxresdefault.jpg",
      title: "Ноутбук",
      price: "1223",
      description: "Так же относится к технике",
      type: { label: "Техника", value: "tech" },
      id: "4",
    },
    {
      image: "https://rasekhoon.net/_files/images/photogallery/dessert(32).jpg",
      title: "Пирожное",
      price: "12863",
      description: "Это у нас еда",
      type: { label: "Еда", value: "food" },
      id: "5",
    },
    {
      image: "https://rasekhoon.net/_files/images/photogallery/dessert(32).jpg",
      title: "Булочка",
      price: "1287",
      description: "Булка с катлеткой",
      type: { label: "Еда", value: "food" },
      id: "6",
    },
    {
      image:
        "https://p.turbosquid.com/ts-thumb/ce/Ia8pal/6rY45nqc/01/jpg/1425364969/1920x1080/fit_q99/e460897bff0d1d2281ff9047a71cb574d6dc35b1/01.jpg",
      title: "Катлэта",
      price: "123",
      description: "Булка без катлэтки",
      type: { label: "Еда", value: "food" },
      id: "7",
    },
    {
      image:
        "https://p.turbosquid.com/ts-thumb/ce/Ia8pal/6rY45nqc/01/jpg/1425364969/1920x1080/fit_q99/e460897bff0d1d2281ff9047a71cb574d6dc35b1/01.jpg",
      title: "Гантеля",
      price: "123",
      description: "Спорт товар бери и качайся",
      type: { label: "Спорт", value: "sport" },
      id: "8",
    },
    {
      image:
        "https://p.turbosquid.com/ts-thumb/ce/Ia8pal/6rY45nqc/01/jpg/1425364969/1920x1080/fit_q99/e460897bff0d1d2281ff9047a71cb574d6dc35b1/01.jpg",
      title: "Гриф",
      price: "1323",
      description: "ХАЛК",
      type: { label: "Спорт", value: "sport" },
      id: "9",
    },
    {
      image:
        "https://p.turbosquid.com/ts-thumb/ce/Ia8pal/6rY45nqc/01/jpg/1425364969/1920x1080/fit_q99/e460897bff0d1d2281ff9047a71cb574d6dc35b1/01.jpg",
      title: "Пицца с сыром",
      price: "13263",
      description: "Пицца с 4 сырами, ммм вкусно и .",
      type: { label: "Еда", value: "food" },
      id: "10",
    },
    {
      image:
        "https://p.turbosquid.com/ts-thumb/ce/Ia8pal/6rY45nqc/01/jpg/1425364969/1920x1080/fit_q99/e460897bff0d1d2281ff9047a71cb574d6dc35b1/01.jpg",
      title: "Кружка",
      price: "1433",
      description: "Стелко разбиться может",
      type: { label: "Техника", value: "tech" },
      id: "11",
    },
  ]);
  const [search, setSearch] = useState("");
  const [valueSelect, setValueSelect] = useState<IOption>({
    value: "",
    label: "По умолчанию",
  });
  const [valueDesc, setValueDesc] = useState("");
  const [category, setCategory] = useState<"asc" | "desc">("asc");
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
            />
          }
        >
          <Button variant={"outline"}>Открыть фильтры</Button>
        </Popup>
        <Popup
          placement={"right"}
          onContent={<Category category={category} setCategory={setCategory} />}
        >
          <Button variant={"outline"}>Категории</Button>
        </Popup>
      </div>
      <ProductList
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
