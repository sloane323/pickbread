import React, { useState } from "react";
import axios from "axios";

const MaterialTypeForm = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState(1);
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");
  const [category, setCategory] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [brand, setBrand] = useState("");
  const [pcsBarcode, setPcsBarcode] = useState("");
  const [boxBarcode, setBoxBarcode] = useState("");
  const [origin, setOrigin] = useState("");

  const unitsArray = ["", "kg", "g", "L", "ml", "cc", "pcs"];
  const categorysArray = [
    "",
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
  const expirysArray = ["", "2일", "7일", "14일"];

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
    setOrigin(event.target.value);
  };

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

  const valueCheckFunc = () => {
    if (name.length === 0) {
      alert("이름이 입력되지 않았습니다");
      return 0;
    } else if (size <= 0) {
      alert("원자재 중량, 단위는 1 이상으로 입력할 수 있습니다");
      return 0;
    } else if (unit.length === 0) {
      alert("원자재의 단위가 설정되지 않았습니다");
      return 0;
    } else if (price.length === 0) {
      alert("가격이 입력되지 않았습니다");
      return 0;
    } else if (defaultPrice.length === 0) {
      alert("기본 가격이 입력되지 않았습니다");
      return 0;
    } else if (expiryDate.length === 0) {
      alert("유효 기간이 설정되지 않았습니다");
      return 0;
    } else if (brand.length === 0) {
      alert("브랜드 이름이 입력되지 않았습니다");
      return 0;
    } else if (pcsBarcode.length === 0) {
      alert("낱개 바코드가 입력되지 않았습니다");
      return 0;
    } else if (boxBarcode.length === 0) {
      alert("박스 바코드가 입력되지 않았습니다");
      return 0;
    } else if (origin.length === 0) {
      alert("원산지가 입력되지 않았습니다");
      return 0;
    } else {
      return 1;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const valueCheck = valueCheckFunc();
    if(valueCheck === 1) {
      const res = await post();
      console.log(res);
      setName("");
      setSize(1);
      setUnit("");
      setPrice("");
      setDefaultPrice("");
      setCategory("");
      setExpiryDate("");
      setBrand("");
      setPcsBarcode("");
      setBoxBarcode("");
      setOrigin("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>원자재 등록</h1>
        {/* 원자재 이름 */}
        <input
          type="text"
          placeholder="원자재 이름"
          value={name}
          onChange={changeNameHandler}
          required
        />
        {/* 원자재 사이즈 */}
        <input
          type="number"
          placeholder="원자재 사이즈"
          value={size}
          onChange={changeSizeHandler}
          min={size}
        ></input>
        {/* 원자재 단위 */}
        <select value={unit} onChange={changeUnitHandler}>
          {unitsArray.map((unitItem, index) => (
            <option key={index}>{unitItem}</option>
          ))}
        </select>
        {/* 원자재 가격 */}
        <input
          type="number"
          placeholder="원자재 가격"
          value={price}
          onChange={changePriceHandler}
          required
        />
        {/* 원자재 기본 가격 */}
        <input
          type="number"
          placeholder="원자재 기본 가격"
          value={defaultPrice}
          onChange={changeDefaultPriceHandler}
          required
        />
        {/* 원자재 카테고리 추가 */}
        <select value={category} onChange={changeCategoryHandler}>
          {categorysArray.map((categoryItem, index) => (
            <option key={index}>{categoryItem}</option>
          ))}
        </select>
        {/* 원자재 카테고리 추가 */}
        <select value={expiryDate} onChange={changeExpiryDateHandler}>
          {expirysArray.map((expiryItem, index) => (
            <option key={index}>{expiryItem}</option>
          ))}
        </select>
        {/* 원자재 브랜드 */}
        <input
          type="text"
          placeholder="원자재 브랜드"
          value={brand}
          onChange={changeBrandHandler}
          required
        />
        {/* 개수 바코드 */}
        <input
          type="text"
          placeholder="개수 바코드"
          value={pcsBarcode}
          onChange={changePcsBarcodeHandler}
          required
        />
        {/* 박스 바코드 */}
        <input
          type="text"
          placeholder="박스 바코드"
          value={boxBarcode}
          onChange={changeBoxBarcodeHandler}
          required
        />
        <input
          type="text"
          placeholder="원산지"
          value={origin}
          onChange={changeOriginHandler}
          required
        />
        <input type="submit" value="제출" />
      </form>
    </div>
  );
};

export default MaterialTypeForm;
