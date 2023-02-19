/* 원자재 등록 페이지 */
import React from "react";
import { useState } from "react";
/* src 안에서만 import 할 수 있다. */
/* import { posting } from '../../server/server' */
import axios from "axios";

const AddMaterial = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState(0);
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");
  const [category, setCategory] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [brand, setBrand] = useState("");
  const [pcsBarcode, setPcsBarcode] = useState("");
  const [boxBarcode, setBoxBarcode] = useState("");
  const [origin, setOrigin] = useState("");

  const unitsArray = ["kg", "g", "L", "ml", "cc", "pcs"];
  const categorysArray = [
    "과일",
    "채소",
    "견과류",
    "쌀",
    "잡곡",
    "가루",
    "양념",
    "오일",
    "건강식품",
    "잡화",
    "도구",
    "기타",
  ];
  const expirysArray = ["2일", "7일", "14일"];

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
  const changeDefaultPriceHandler = (event) => {
    setDefaultPrice(event.target.value);
  };
  const changeCategoryHandler = (event) => {
    setCategory(event.target.value);
  };
  const changeExpiryDateHandler = (event) => {
    setExpiryDate(event.target.value);
  };
  const changeBrandHandler = (event) => {
    setBrand(event.target.value);
  };
  const changePcsBarcodeHandler = (event) => {
    setPcsBarcode(event.target.value);
  };
  const changeBoxBarcodeHandler = (event) => {
    setBoxBarcode(event.target.value);
  };
  const changeOriginHandler = (event) => {
    setOrigin(event.target.value)
  }

  const post = () => {
    const url = "/api/material";
    const material = new FormData();
    material.append("name", name);
    material.append("size", size);
    material.append("unit", unit);
    material.append("price", price);
    material.append("defaultPrice", defaultPrice);
    material.append("category", category);
    material.append("expiryDate", expiryDate);
    material.append("brand", brand);
    material.append("pcsBarcode", pcsBarcode);
    material.append("boxBarcode", boxBarcode);
    material.append("origin", origin);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    return axios.post(url, material, config);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const res = await post();
    console.log(res);
    setName("");
    setSize(0);
    setUnit("");
    setPrice("");
    setDefaultPrice("");
    setCategory("");
    setExpiryDate("");
    setBrand("");
    setPcsBarcode("");
    setBoxBarcode("");
    setOrigin("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* 원자재 이름 */}
        <input
          type="text"
          placeholder="원자재 이름"
          value={name}
          onChange={changeNameHandler}
        />
        {/* 원자재 사이즈 */}
        <input
          type="number"
          placeholder="원자재 사이즈"
          value={size}
          onChange={changeSizeHandler}
        ></input>
        {/* 원자재 단위 */}
        <select value={unit} onChange={changeUnitHandler}>
          {unitsArray.map((unitItem) => (
            <option>{unitItem}</option>
          ))}
        </select>
        {/* 원자재 가격 */}
        <input
          type="number"
          placeholder="원자재 가격"
          value={price}
          onChange={changePriceHandler}
        />
        {/* 원자재 기본 가격 */}
        <input
          type="number"
          placeholder="원자재 기본 가격"
          value={defaultPrice}
          onChange={changeDefaultPriceHandler}
        />
        {/* 원자재 카테고리 추가 */}
        <select value={category} onChange={changeCategoryHandler}>
          {categorysArray.map((categoryItem) => (
            <option>{categoryItem}</option>
          ))}
        </select>
        {/* 원자재 카테고리 추가 */}
        <select value={expiryDate} onChange={changeExpiryDateHandler}>
          {expirysArray.map((expiryItem) => (
            <option>{expiryItem}</option>
          ))}
        </select>
        {/* 원자재 브랜드 */}
        <input
          type="text"
          placeholder="원자재 브랜드"
          value={brand}
          onChange={changeBrandHandler}
        />
        {/* 개수 바코드 */}
        <input
          type="number"
          placeholder="개수 바코드"
          value={pcsBarcode}
          onChange={changePcsBarcodeHandler}
        />
        {/* 박스 바코드 */}
        <input
          type="number"
          placeholder="박스 바코드"
          value={boxBarcode}
          onChange={changeBoxBarcodeHandler}
        />
        <input
          type="text"
          placeholder="원산지"
          value={origin}
          onChange={changeOriginHandler}
        />
        <input type="submit" value="제출" />
      </form>
    </div>
  );
};

export default AddMaterial;
