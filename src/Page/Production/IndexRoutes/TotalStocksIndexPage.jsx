import React, { useState } from "react";
import GetCurrentMaterialStocks from "../../../components/GetStocks/GetCurrentMaterialStocks"
import GetCurrentProductStocks from "../../../components/GetStocks/GetCurrentProductStocks"

const TotalStocksIndexPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const compArray = [
    {
      tabBttn: (
        <button
          className={activeIndex === 0 ? "active22" : ""}
          onClick={() => setActiveIndex(0)}
          key={0}
        >
          현재 원자재 재고 조회
        </button>
      ),
      tabComp: (
        <div>
          <br></br>
          <GetCurrentMaterialStocks></GetCurrentMaterialStocks>
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
          현재 제품 재고 조회
        </button>
      ),
      tabComp: (
        <div>
          <br></br>
          <GetCurrentProductStocks></GetCurrentProductStocks>
        </div>
      ),
    }
  ];
  return (
    <div>
      {compArray.map((comp) => (comp.tabBttn))}
      <hr />
      {compArray[activeIndex].tabComp}
    </div>
  )
}

export default TotalStocksIndexPage
