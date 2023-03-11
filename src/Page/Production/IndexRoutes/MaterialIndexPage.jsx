import React, { useState } from "react";
import AddMaterialsType from "../MaterialPages/AddMaterialsType";
import PurchaseMaterial from "../MaterialPages/PurchaseMaterial";
import PurchaseMaterialsHistory from "../MaterialPages/PurchaseMaterialsHistory";
import CurrentMaterialStocks from "../MaterialPages/CurrentMaterialStocks";

/* 파악하고 적용한 구조

1) 트리거가 될 수 있도록 state를 정의
2) 배열을 생성하고 요소는 리터럴 형식으로 작성, 버튼과 컴포넌트를 정의한다.
2-1) 버튼은 state에 따라 스타일을 다르게 부여하며, 클릭하면 state를 움직이게 해둔다
2-2) 컴포넌트 자체는 블럭 요소로 감싸는 것 외의 특이사항이 없다
3) 렌더링, 컴포넌트 배열을 map으로 반복하며 호출하는 컴포넌트는 state에 따라 달라진다 */

const MaterialIndexPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const compArray = [
    {
      tabBttn: (
        <button
          className={activeIndex === 0 ? "active22" : ""}
          onClick={() => setActiveIndex(0)}
          key={0}
        >
          원자재 종류 등록
        </button>
      ),
      tabComp: (
        <div>
          <br></br>
          <AddMaterialsType></AddMaterialsType>
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
          원자재 구매
        </button>
      ),
      tabComp: (
        <div>
          <br></br>
          <PurchaseMaterial></PurchaseMaterial>
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
          원자재 구매 내역
        </button>
      ),
      tabComp: (
        <div>
          <br></br>
          <PurchaseMaterialsHistory></PurchaseMaterialsHistory>
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
          현재 원자재 재고
        </button>
      ),
      tabComp: (
        <div>
          <br></br>
          <CurrentMaterialStocks></CurrentMaterialStocks>
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

export default MaterialIndexPage;
