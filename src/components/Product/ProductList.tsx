import { FormEvent, useEffect, useMemo, useState } from "react";
import { Product } from "./Product.tsx";
import classes from "./Product.module.css";
import { Modal } from "../Modal/Modal.tsx";
import { FormProduct } from "./FormProduct.tsx";
import { IOption } from "../Select/Select.tsx";
import classNames from "classnames";

export interface IProduct {
  image: string;
  title: string;
  price: string;
  description: string;
  type?: IOption;
  id?: string;
}
interface ProductList {
  selectedValue: IProduct | null;
  setSelectedValue: (value: IProduct | null) => void;
  products: IProduct[];
  setProducts: (value: IProduct[]) => void;
  search: string;
  valueSelect?: IOption;
  valueDesc: string;
  category: "asc" | "desc";
}
const handleSearchProduct = (products: IProduct[], search: string) => {
  if (!search) return products;
  return products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );
};

const typeFilterProduct = (products: IProduct[], value: string) => {
  if (!value) return products;

  return products.filter((product) => {
    return product.type?.value === value;
  });
};
const descFilterProduct = (products: IProduct[], valueDesc: string) => {
  if (!valueDesc) return products;

  return products.filter((product) =>
    product.description.toLowerCase().includes(valueDesc.toLowerCase()),
  );
};
const compare = (a: string, b: string) => (+a < +b ? 1 : -1);

const sortProducts = (products: IProduct[], category: "asc" | "desc") => {
  if (!category) return products;

  return products.sort((a, b) => {
    return category === "desc"
      ? compare(a.price, b.price)
      : compare(b.price, a.price);
  });
};
const paginationProductList = (
  productsParams: IProduct[],
  startPoint: number,
  endPoint: number,
) => {
  console.log(startPoint, endPoint);
  return productsParams.slice(startPoint, endPoint);
};
export const ProductList = ({
  setProducts,
  products,
  setSelectedValue,
  selectedValue,
  search,
  valueDesc,
  valueSelect,
  category,
}: ProductList) => {
  const [pagination, setPagination] = useState({ startPoint: 0, endPoint: 5 });
  const sortAndFilterProducts = useMemo(() => {
    const searchProduct = handleSearchProduct(products, search);
    const typeFilter = typeFilterProduct(
      searchProduct,
      valueSelect?.value || "",
    );
    const descTypeFilter = descFilterProduct(typeFilter, valueDesc);
    return sortProducts(descTypeFilter, category);
  }, [products, search, valueSelect?.value, valueDesc, category]);
  const paginationProduct = useMemo(() => {
    console.log(sortAndFilterProducts);
    return paginationProductList(
      sortAndFilterProducts,
      pagination.startPoint,
      pagination.endPoint,
    );
  }, [pagination.endPoint, pagination.startPoint, sortAndFilterProducts]);
  console.log(paginationProduct);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedValue?.id) {
      const updateProducts = products.map((product) => {
        if (product.id === selectedValue.id) {
          return selectedValue;
        } else {
          return product;
        }
      });
      setProducts(updateProducts);
      setSelectedValue(null);
    } else {
      if (selectedValue) {
        setProducts([
          ...products,
          {
            ...selectedValue,
            id: String(Math.random()),
            type: selectedValue.type,
          },
        ]);
        setSelectedValue(null);
      }
    }
  };
  return (
    <div className={classes.productList}>
      <div className={classes.productContent}>
        {paginationProduct.map((product) => (
          <Product
            key={product.title}
            value={product}
            onEdit={() => setSelectedValue(product)}
          />
        ))}
        <div className={classes.paginationContainer}>
          {new Array(Math.ceil(sortAndFilterProducts.length / 5))
            .fill("")
            .map((btn, index) => (
              <button
                className={classNames(
                  classes.paginationButton,
                  classes.paginationButtonFocus,
                )}
                key={index}
                onClick={() =>
                  setPagination({
                    ...pagination,
                    startPoint: index === 0 ? 0 : index * 5,
                    endPoint: index === 0 ? 5 : index * 5 + 5,
                  })
                }
              >
                {index + 1}
              </button>
            ))}
        </div>
        {selectedValue && (
          <Modal
            onClose={() => setSelectedValue(null)}
            active={Boolean(selectedValue)}
          >
            <FormProduct
              setValue={setSelectedValue}
              onSubmit={onSubmit}
              value={selectedValue}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};
