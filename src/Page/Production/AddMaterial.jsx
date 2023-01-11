/* 원자재 등록 페이지 */
import React from "react";
import { useState } from "react";
/* src 안에서만 import 할 수 있다. */
/* import { posting } from '../../server/server' */
import axios from "axios";

const AddMaterial = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");

  const changeNameHandler = (event) => {
    setName(event.target.value);
  };
  const changePriceHandler = (event) => {
    setPrice(event.target.value);
  };
  const changeBrandHandler = (event) => {
    setBrand(event.target.value);
  };
  const changeSizeHandler = (event) => {
    setSize(event.target.value)
  }

  const post = () => {
    const url = "/api/material";
    const material = new FormData();
    material.append("name", name);
    material.append("size", size);
    material.append("price", price);
    material.append("brand", brand);
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
    setSize("");
    setPrice("");
    setBrand("");
  };
  return (
    <div>
      {/* 특정 페이지로 갈까, js 파일로 갈까? */}
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
          type="text"
          placeholder="원자재 사이즈"
          value={size}
          onChange={changeSizeHandler}
        ></input>
        {/* 원자재 가격 */}
        <input
          type="text"
          placeholder="원자재 가격"
          value={price}
          onChange={changePriceHandler}
        />
        {/* 원자재 브랜드 */}
        <input
          type="text"
          placeholder="원자재 브랜드"
          value={brand}
          onChange={changeBrandHandler}
        />
        <input type="submit" value="제출" />
      </form>
    </div>
  );
};

export default AddMaterial;
