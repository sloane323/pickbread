// 생산 - 제품 제작페이지
// - 제품 등록/ 제품제작내용 등록 /레시피둥록/ 조회/
import axios from "axios";
import { useState, useEffect } from "react";
import MaterialOption from "../../components/Purchase/MaterialOption";


const AddProduct = () => {
  //제품등록 입력받을 state
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [materials, setMaterials] = useState("");

  // 원자재 선택한거 보관하는 state
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [recipeMaterials, setRecipeMaterials] = useState([]);

  // 선택2
  const [addSelect, setAddSelect] = useState("");
  
  /* 랜덤 변수 생성, 레시피 ID로 보낼 내용 */
  const productId = Math.random().toString(32).slice(2);
  console.log(productId)

  /* 원자재 테이블 접근과 반환 */
  const getMaterials = async () => {
    const url = "/api/material";
    const response = await axios.get(url);
    setMaterials(response.data);
  };

  /* 원자재 테이블 접근은 렌더링 시 곧바로 */
  useEffect(() => {
    getMaterials();
  }, []);

  /* materials state를 참조해서 useEffect */
  useEffect(() => {
    /* 만약 selectedMaterial state가 없고, material이라는 state는 있으며 길이가 0이 아닐 때 */
    if (!selectedMaterial && materials && materials.length !== 0) {
      /* materials 배열 첫 번째의 원자재 ID 가져오기 */
      const id = materials[0].원자재ID;
      /* materials 배열 첫 번째의 원자재 이름 가져오기 */
      const name = materials[0].이름;
      /* selectedMaterial state에 setter로 넣기 */
      setSelectedMaterial({ id, name });
    }
    /* 만약 addSelect state가 없고, material이라는 state는 있으며 길이가 0이 아닐 때 */
    if (!addSelect && materials && materials.length !== 0) {
      /* materials 배열 첫 번째의 원자재 ID 가져오기 */      
      const id = materials[0].원자재ID;
      /* materials 배열 첫 번째의 원자재 이름 가져오기 */
      const name = materials[0].이름;
      /* addSelect state에 setter로 넣기 */
      setAddSelect({ id, name });
    }
  }, [materials]);

  /* selectMaterialHandler는 select 요소에서 작동 */
  const selectMaterialHandler = (e) => {
    /* 요소의 옵션 중 selectedIndex를 반환 */
    const idx = e.target.options.selectedIndex;
    /* materials 데이터에 idx를 접근, 원자재ID 받아오기 */
    const id = materials[idx].원자재ID;
    /* selectedMaterial state에 setter로 넣기 */
    setSelectedMaterial({ id, name: e.target.value });
  };

  console.log(recipeMaterials)

  // 제품등록 post 요청
  const post = () => {
    const url = "/api/product";
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("name", name);
    formData.append("size", size);
    formData.append("unit", unit);
    formData.append("price", price);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    console.log(formData);
    return axios.post(url, formData, config);
  };

  const recipePost = (i) => {
    if(recipeMaterials.length > 0) {
      const url = "/api/recipe";
      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("materialId", recipeMaterials[i].id)
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      return axios.post(url, formData, config);
    }
  }

  const changeNameHandler = (event) => {
    setName(event.target.value);
  };

  const changeSizeHandler = (event) => {
    setSize(event.target.value)
  }

  const changeUnitHandler = (event) => {
    setUnit(event.target.value)
  }

  const changePriceHandler = (event) => {
    setPrice(event.target.value);
  };

  /* 버튼을 통해서 실행 */
  const addRecipe = () => {
    /* recipeMaterials state를 다루고, 이전 재료들과 선택된 재료를 나열 */
    setRecipeMaterials((prev)=>{
        return [...prev, selectedMaterial]
    })
  }

  /* onSubmit, post 호출 */
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await post();
    for(let i = 0; i < recipeMaterials.length; i++) {
      const res = await recipePost(i);
    }
    setName("");
    setPrice("");
    setSize("");
    setUnit("");
    setRecipeMaterials([]);
  };

  return (
    <div>
      <h1>제품 제작 등록</h1>
      <div>
        {/* 제품 등록하면서 레시피가 함께 등록되는 구조 */}
        <h3>제품 등록</h3>
        <form onSubmit={onSubmit}>
          {/* 제품ID 제외 -랜덤생성 */}
          이름
          <input
            type="text"
            value={name}
            onChange={changeNameHandler}
          />
          <br />
          사이즈
          <input
            type="number"
            value={size}
            onChange={changeSizeHandler}
          />
          <br />
          단위
          <input
            type="text"
            value={unit}
            onChange={changeUnitHandler}
          />
          <br />
          가격
          <input
            type="number"
            value={price}
            onChange={changePriceHandler}
          />
          <br />
          {/* 레시피선택 */}
          <div>
            <b>원자재 종류</b>
            <select
              onChange={selectMaterialHandler}
              value={selectedMaterial.name}
            >
              {materials &&
                materials?.map((material) => {
                  return (
                    <MaterialOption
                      key={material.원자재ID}
                      material={material}
                    />
                  );
                })}
            </select>

            <button type="button" onClick={addRecipe}>추가</button>
            {
            recipeMaterials && recipeMaterials.length > 0 && 
            recipeMaterials.map((add, idx)=>(
                <div key={idx}>
                    <p>{add.id}</p>
                    {add.name}
                </div>))
            }
          </div>
          <button>제출</button>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default AddProduct;
