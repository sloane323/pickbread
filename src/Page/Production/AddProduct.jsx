import React, { useState } from "react";
import AddIngredients from "../../components/AddIngredients";
import axios from "axios";

const AddProduct = () => {
  /* 재료는 사용자가 각각 추가한다는 전제 하에 초기 값 0 */
  const [addInput, setAddInput] = useState(0);

  /* 클릭할 때마다 입력을 위한 컴포넌트를 호출하고 칸 삭제를 위한 props를 보내기 */
  const addInputZone = () => {
    const inputZone = [];
    for(let i = 0; i < addInput; i++) {
      inputZone.push(<AddIngredients addInput={addInput} setAddInput={setAddInput} key={Math.random().toString(32).slice(2)}></AddIngredients>)
    }
    return inputZone;
  };

  /* 클릭마다 addInput을 1 증가시켜서 for문의 조건으로 삼기 */
  const moreInput = () => {
    setAddInput(addInput + 1);
  }

  return (
    <div>
      <form onSubmit={""}>
        <div>
          <input type="button" value="추가" onClick={() => moreInput()} />
        </div>
        <div>
          <input type="text" placeholder="제품 이름" />
        </div>
        <div>
          {addInputZone()}
        </div>
        <input type="submit" value="등록" />
      </form>
    </div>
  );
};

export default AddProduct;
