import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const GetCurrentMaterialStocks = () => {
  const [materialStocks, setMataialStocks] = useState(null);
  const getMaterialStocks = async () => {
    try {
      const response = await axios.get(`/api/material`);
      /* console.log(response.data) */
      setMataialStocks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMaterialStocks();
  }, []);
  return (
    <div>
      <h1>원자재 재고 확인</h1>
      <table>
        <thead>
          <tr>
            <td>이름</td>
            <td>원자재ID</td>
            <td>사이즈</td>
            <td>단위</td>
            <td>현재가격</td>
            <td>기준가격</td>
            <td>재고</td>
            <td>원자재 재고 상세 조회</td>
          </tr>
        </thead>
        <tbody>
          {materialStocks ? (
            materialStocks.map((materialStock) => (
              <tr key={materialStock.원자재ID}>
                <td>{materialStock.이름}</td>
                <td>{materialStock.원자재ID}</td>
                <td>{materialStock.사이즈}</td>
                <td>{materialStock.단위}</td>
                <td>{materialStock.현재가격}</td>
                <td>{materialStock.기준가격}</td>
                {materialStock.재고 ? (
                  <td>{materialStock.재고}</td>
                ) : (
                  <td>SOLD OUT</td>
                )}
                <td>
                  <Link to={`/production/material/${materialStock.원자재ID}`}>
                    ▶재고확인(detail)
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>NOT YET</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GetCurrentMaterialStocks;
