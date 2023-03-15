import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const GetCurrentProductStocks = () => {
  const [productStocks, setProductStocks] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const getProductStocks = async () => {
    try {
      const response = await axios.get(`/api/p_stock`);
      setProductStocks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductStocks();
  }, []);
  const searchProductStocks = async () => {
    const url = `/api/p_stock/search/${searchQuery}`;
    const response = await axios.get(url);
    setProductStocks(response.data);
  }
  return (
    <div>
      <h1>제품 재고 확인</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <button onClick={searchProductStocks}>검색</button>
      <button onClick={getProductStocks}>초기화</button>
      <table>
        <thead>
          <tr>
            <td>이름</td>
            <td>사이즈</td>
            <td>제품ID</td>
            <td>단위</td>
            <td>가격</td>
            <td>재고</td>
            <td>재고확인</td>
          </tr>
        </thead>
        <tbody>
          {productStocks ? (
            productStocks.map((productStock) => (
              <tr key={productStock.제품ID}>
                <td>{productStock.이름}</td>
                <td>{productStock.사이즈}</td>
                <td>{productStock.제품ID}</td>
                <td>{productStock.단위}</td>
                <td>{productStock.가격}</td>
                {productStock.재고 ? (
                  <td>{productStock.재고}</td>
                ) : (
                  <td>SOLD OUT</td>
                )}
                <td>
                  <Link to={`/production/product/${productStock.제품ID}`}>
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

export default GetCurrentProductStocks;
