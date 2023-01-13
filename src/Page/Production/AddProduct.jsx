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
  
  const productId = Math.random().toString(32).slice(2);
  const getMaterials = async () => {
    const url = "/api/material";
    const response = await axios.get(url);
    setMaterials(response.data);
  };
  useEffect(() => {
    getMaterials();
  }, []);

  useEffect(() => {
    if (!selectedMaterial && materials && materials.length !== 0) {
      const id = materials[0].원자재ID;
      const name = materials[0].이름;
      setSelectedMaterial({ id, name });
    }
    if (!addSelect && materials && materials.length !== 0) {
      const id = materials[0].원자재ID;
      const name = materials[0].이름;
      setAddSelect({ id, name });
    }
  }, [materials]);
  const selectMaterialHandler = (e) => {
    const idx = e.target.options.selectedIndex;
    const id = materials[idx].원자재ID;
    setSelectedMaterial({ id, name: e.target.value });
  };
  console.log(recipeMaterials)
  //제품등록 post요청
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
  const addRecipe = () => {
    setRecipeMaterials((prev)=>{
        return [...prev, selectedMaterial]
    })
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await post();
    setName("");
    setPrice("");
    setSize("");
    setUnit("");
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
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          사이즈
          <input
            type="number"
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
          <br />
          단위
          <input
            type="text"
            onChange={(e) => {
              setUnit(e.target.value);
            }}
          />
          <br />
          가격
          <input
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
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
