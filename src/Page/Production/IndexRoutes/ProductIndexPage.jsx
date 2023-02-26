import React from "react";
import AddProductsType from "../ProductPages/AddProductsType";
import CurrentProductTypes from "../ProductPages/CurrentProductTypes";
import ManufactureProducts from "../ProductPages/ManufactureProducts";
import CurrentProductStocks from "../ProductPages/CurrentProductStocks";

const ProductIndexPage = () => {
  return (
    <div>
      <AddProductsType></AddProductsType>
      <CurrentProductTypes></CurrentProductTypes>
      <ManufactureProducts></ManufactureProducts>
      <CurrentProductStocks></CurrentProductStocks>
    </div>
  );
};

export default ProductIndexPage;
