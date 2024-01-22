import React, { FormEvent, useEffect, useMemo, useRef } from "react";
import { Product } from "./Product.tsx";
import classes from "./Product.module.css";
import { Modal } from "../Modal/Modal.tsx";
import { FormProduct } from "./FormProduct.tsx";
import { IOption } from "../Select/Select.tsx";

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
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: (value: number) => void;
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
  const cloneProducts = [...products];
  return cloneProducts.sort((a, b) => {
    return category === "desc"
      ? compare(a.price, b.price)
      : compare(b.price, a.price);
  });
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
  pageSize,
  setPageSize,
  page,
}: ProductList) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sortAndFilterProducts = useMemo(() => {
    const searchProduct = handleSearchProduct(products, search);
    const typeFilter = typeFilterProduct(
      searchProduct,
      valueSelect?.value || "",
    );
    const descTypeFilter = descFilterProduct(typeFilter, valueDesc);
    return sortProducts(descTypeFilter, category);
  }, [products, search, valueSelect?.value, valueDesc, category]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          setPageSize((prevState) => prevState + 5);
          /* observer.unobserve(entries[0].target);*/
        }
      },
      { rootMargin: "100px 0px 0px 0px" },
    );
    if (scrollRef.current) {
      obs.observe(scrollRef.current);
    }
    return () => {
      obs.disconnect();
    };
  }, [setPageSize, sortAndFilterProducts]);
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
  const data = sortAndFilterProducts.slice(page, (page + 1) * pageSize);
  return (
    <div className={classes.productList}>
      <div className={classes.productContent}>
        {data.map((product) => (
          <Product
            key={product.title}
            value={product}
            onEdit={() => setSelectedValue(product)}
          />
        ))}
        {/*        <div className={classes.paginationContainer}>
          {new Array(Math.ceil(sortAndFilterProducts.length / pageSize))
            .fill("")
            .map((btn, index) => (
              <button
                className={classNames(
                  classes.paginationButton,
                  classes.paginationButtonFocus,
                )}
                key={index}
                onClick={() => setPage(index)}
              >
                {index + 1}
              </button>
            ))}
        </div>*/}
        {/*<div className={classes.paginationPageSize}>
          <p>Колличество</p>
          {[5, 10, 15].map((btn) => (
            <button
              key={btn}
              className={classes.paginationButton}
              onClick={() => {
                setPageSize(btn);
                setPage(0);
              }}
            >
              {btn}
            </button>
          ))}
        </div>*/}

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
      <div className={classes.scrollBlock} ref={scrollRef}></div>
    </div>
  );
};
