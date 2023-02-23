import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Stock = () => {
  const [materialStocks, setMataialStocks] = useState(null);
  const [productStocks, setProductStocks] = useState(null);

  const getMaterialStocks = async () => {
    try {
      const response = await axios.get(`/api/material`);
      /* console.log(response.data) */
      setMataialStocks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getProductStocks = async () => {
    try {
      const response = await axios.get(`/api/p_stock`);
      setProductStocks(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMaterialStocks();
    getProductStocks();
  }, []);

  return (
    <div>
      <h1>원자재 재고 확인</h1>
      <table>
        <thead>
          <tr>
            <td>이름</td>
            <td>사이즈</td>
            <td>단위</td>
            <td>현재가격</td>
            <td>기준가격</td>
            <td>카테고리</td>
            <td>유효기한</td>
            <td>브랜드</td>
            <td>낱개바코드</td>
            <td>박스바코드</td>
            <td>원산지</td>
            <td>원자재 재고 상세 조회</td>
          </tr>
        </thead>
        <tbody>
          {materialStocks ? (
            materialStocks.map((materialStock) => (
              <tr key={materialStock.원자재ID}>
                <td>{materialStock.이름}</td>
                <td>{materialStock.사이즈}</td>
                <td>{materialStock.단위}</td>
                <td>{materialStock.현재가격}</td>
                <td>{materialStock.기준가격}</td>
                <td>{materialStock.카테고리}</td>
                <td>{materialStock.유효기한}</td>
                <td>{materialStock.브랜드}</td>
                <td>{materialStock.낱개바코드}</td>
                <td>{materialStock.박스바코드}</td>
                <td>{materialStock.원산지}</td>
                <td>
                  <Link to={`/production/stock/${materialStock.원자재ID}`}>
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
      <h1>제품 재고 확인</h1>
      <table>
        <thead>
          <tr>
            <td>재고ID</td>
            <td>생산ID</td>
            <td>제품ID</td>
            <td>잔량</td>
            <td>유통기한</td>
            <td>폐기여부</td>
            <td>재고확인</td>
          </tr>
        </thead>
        <tbody>
          {productStocks ? (
            productStocks.map((productStock) => (
              <tr key={productStock.재고ID}>
                <td>{productStock.재고ID}</td>
                <td>{productStock.생산ID}</td>
                <td>{productStock.제품ID}</td>
                <td>{productStock.잔량}</td>
                <td>{productStock.유통기한}</td>
                <td>{productStock.폐기여부}</td>
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

export default Stock;
