import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductIndexPage from "./IndexRoutes/ProductIndexPage";
import MaterialIndexPage from "./IndexRoutes/MaterialIndexPage";
import TotalStocksIndexPage from "./IndexRoutes/TotalStocksIndexPage";

// 생산 페이지
const Production = () => {
  const navigate = useNavigate();

  const goToMaterialIndexPage = () => {
    navigate("/production/material");
  };
  const goToProductPage = () => {
    navigate("/production/product");
  };
  const goToTotalStocksPage = () => {
    navigate("/production/total-stocks");
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const compArray = [
    {
      tabBttn: (
        <button
          className={activeIndex === 0 ? "active22" : ""}
          onClick={() => setActiveIndex(0)}
          key={0}
        >
          원자재 페이지
        </button>
      ),
      tabComp: (
        <div>
          <br></br>
          <ProductIndexPage></ProductIndexPage>
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
          제품 페이지
        </button>
      ),
      tabComp: (
        <div>
          <br></br>
          <MaterialIndexPage></MaterialIndexPage>
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
          원자재 및 제품 통합 재고
        </button>
      ),
      tabComp: (
        <div>
          <br></br>
          <TotalStocksIndexPage></TotalStocksIndexPage>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>원자재, 제품, 재고</h1>
      {compArray.map((comp) => comp.tabBttn)}
      <hr />
      {compArray[activeIndex].tabComp}
    </div>
  );
};

export default Production;
