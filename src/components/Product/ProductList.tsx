import {
  FormEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  console.log(category);
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
  window.scroll({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
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
  const productItemRef = useRef<HTMLDivElement>(null);
  const sortAndFilterProducts = useMemo(() => {
    const searchProduct = handleSearchProduct(products, search);
    const typeFilter = typeFilterProduct(
      searchProduct,
      valueSelect?.value || "",
    );
    const descTypeFilter = descFilterProduct(typeFilter, valueDesc);
    return sortProducts(descTypeFilter, category);
  }, [products, search, valueSelect?.value, valueDesc, category]);

  const paginationProduct = () => {
    return paginationProductList(
      sortAndFilterProducts,
      pagination.startPoint,
      pagination.endPoint,
    );
  };

  /*  useEffect(() => {
    const getPosition = () => {
      if (productItemRef.current) {
        const productItem = productItemRef.current.getBoundingClientRect();
        console.log(productItem);
      }
      if (sortAndFilterProducts) {
        window.addEventListener("resize", getPosition);
        window.addEventListener("scroll", getPosition);
      }
      return () => {
        window.removeEventListener("resize", getPosition);
        window.removeEventListener("scroll", getPosition);
      };
    };
    getPosition();
  }, [sortAndFilterProducts]);*/
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
        {paginationProduct().map((product, index) => (
          <Product
            key={product.title}
            indexElement={index}
            productItemRef={productItemRef}
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
