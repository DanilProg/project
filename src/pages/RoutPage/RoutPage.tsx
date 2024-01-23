import { Route, Routes } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { Main } from "../../components/Main/Main.tsx";
import { ProductPage } from "../ProductPage/ProductPage.tsx";
import { CalculatePage } from "../CalculatePage/CalculatePage.tsx";

export const RoutPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path={"/products"} element={<ProductPage />} />
        <Route path={"/calculate"} element={<CalculatePage />} />
      </Route>
    </Routes>
  );
};
