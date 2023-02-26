import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialOption from "../PurchaseMaterials/MaterialOption";

const ProductTypeForm = () => {
  const [materials, setMaterials] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [recipeMaterials, setRecipeMaterials] = useState([]);
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
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await productPost();
    for (let i = 0; i < recipeMaterials.length; i++) {
      const res = await recipePost(i);
    }
    setName("");
    setPrice("");
    setSize("");
    setUnit("");
    setRecipeMaterials([]);
  };
  const productPost = () => {
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
    if (recipeMaterials.length > 0) {
      const url = "/api/recipe";
      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("materialId", recipeMaterials[i].id);
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      return axios.post(url, formData, config);
    }
  };
  const changeNameHandler = (event) => {
    setName(event.target.value);
  };
  const changeSizeHandler = (event) => {
    setSize(event.target.value);
  };
  const changeUnitHandler = (event) => {
    setUnit(event.target.value);
  };
  const changePriceHandler = (event) => {
    setPrice(event.target.value);
  };
  const selectMaterialHandler = (e) => {
    const idx = e.target.options.selectedIndex;
    const id = materials[idx].원자재ID;
    setSelectedMaterial({ id, name: e.target.value });
  };
  const addRecipe = () => {
    setRecipeMaterials((prev) => {
      return [...prev, selectedMaterial];
    });
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
          <input type="text" value={name} onChange={changeNameHandler} />
          <br />
          사이즈
          <input type="number" value={size} onChange={changeSizeHandler} />
          <br />
          단위
          <input type="text" value={unit} onChange={changeUnitHandler} />
          <br />
          가격
          <input type="number" value={price} onChange={changePriceHandler} />
          <br />
          {/* 레시피선택 */}
          <div>
            <p>원자재 종류</p>
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
            <button type="button" onClick={addRecipe}>
              추가
            </button>
            {recipeMaterials &&
              recipeMaterials.length > 0 &&
              recipeMaterials.map((add, idx) => (
                <div key={idx}>
                  <p>{add.id}</p>
                  {add.name}
                </div>
              ))}
          </div>
          <button>제출</button>
        </form>
      </div>
    </div>
  );
};

export default ProductTypeForm;
