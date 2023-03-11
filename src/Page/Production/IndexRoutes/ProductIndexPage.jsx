import React, { useState } from "react";
import AddProductsType from "../ProductPages/AddProductsType";
import CurrentProductTypes from "../ProductPages/CurrentProductTypes";
import ManufactureProducts from "../ProductPages/ManufactureProducts";
import CurrentProductStocks from "../ProductPages/CurrentProductStocks";

const ProductIndexPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const compArray = [
    {
      tabBttn: (
        <button
          className={activeIndex === 0 ? "active22" : ""}
          onClick={() => setActiveIndex(0)}
          key={0}
        >
          제품 종류 등록
        </button>
      ),
      tabComp: (
        <div>
          <br></br>
          <AddProductsType></AddProductsType>
        </div>
      ),
    },
    {
      tabBttn: (
        <button
          className={activeIndex === 1 ? "active22" : ""}
          onClick={() => setActiveIndex(1)}
          key={1}
        >
          현재 제품 종류 조회
        </button>
      ),
      tabComp: (
        <div>
          <br></br>
          <CurrentProductTypes></CurrentProductTypes>
        </div>
      ),
    },
    {
      tabBttn: (
        <button
          className={activeIndex === 2 ? "active22" : ""}
          onClick={() => setActiveIndex(2)}
          key={2}
        >
          제품 생산
        </button>
      ),
      tabComp: (
        <div>
          <br></br>
          <ManufactureProducts></ManufactureProducts>
        </div>
      ),
    },
    {
      tabBttn: (
        <button
          className={activeIndex === 3 ? "active22" : ""}
          onClick={() => setActiveIndex(3)}
          key={3}
        >
          현재 제품 재고
        </button>
      ),
      tabComp: (
        <div>
          <br></br>
          <CurrentProductStocks></CurrentProductStocks>
        </div>
      ),
    },
  ];
  return (
    <div>
      {compArray.map((comp) => (comp.tabBttn))}
      <hr />
      {compArray[activeIndex].tabComp}
    </div>
  );
};

export default ProductIndexPage;
