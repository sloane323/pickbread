import React, { useState, useEffect } from "react";
import AddIngredients from "../../components/AddIngredients";
import axios from "axios";

const AddProduct = () => {
  /* map 메서드 사용을 위한 빈 배열과 setter */
  const [addInput, setAddInput] = useState([]);

  /* 배열 안의 객체에 담으려 하는 카운터 state와 setter */
  const [inputCounter, setInputCounter] = useState(0)

  /* 재료 이름이 대입될 state, setter */
  const [ingredients, setIngredients] = useState("")

  const moreInput = () => {
    const newInput = {
      /* inputCounter state와 ingredient state를 대입 */
      inputCounter: inputCounter,
      ingredients: ingredients,
      /* setter는 보내줄 필요 없음 */
      // setIngredients: setIngredients
    }
    /* 빈 배열부터 시작해 concat으로 이어붙임 */
    setAddInput(addInput.concat(newInput))
    /* 카운터 state는 증가 */
    setInputCounter(inputCounter + 1)
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
          {/* 호출할 때는 addInput 배열의 길이를 조건으로 두고 map 메서드 적용
          
          addInput의 각 요소 input에서 키와 값을 사용할 수 있으며
          index를 통해 전체 addInput의 알맞은 요소에 접근하여 키 값에 다시 접근
          
          원래는 ingredients state에 대한 setter(setIngredients)를 props로 보내서 활용하려고 했는데
          여기에서는 setter를 보내지 않고 함수로 다시 정의
          
          함수가 인수로 받아올 값을 파라미터로 지정하고
          전체 addInput 중 index에 맞게 접근해서 파라미터를 알맞는 요소의 ingredients 키에 대입해준다
          
          나머지 addInput은 그대로 유지되길 원하므로 스프레드 연산자로 펼쳐줌 */}
          {addInput.length > 0 ? addInput.map((input, index) => (<AddIngredients key={input.inputCounter} 
          ingredients={input.ingredients} setIngredients={(item_name)=>{
            addInput[index].ingredients = item_name
            setAddInput([...addInput])
            console.log("???" + item_name)
            console.log(addInput)
          }}></AddIngredients>)) : ""}
        </div>
        <input type="submit" value="등록" />
      </form>
    </div>
  );
};

export default AddProduct;
