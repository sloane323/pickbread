import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Stock = () => {
  const [stocks, setStocks] = useState(null);
  const [products, setProducts] = useState(null);

  const getStocks = async () => {
    try {
      const response = await axios.get(`/api/material`);
      /* console.log(response.data) */
      setStocks(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`/api/production`);
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStocks();
    getProducts();
  }, []);

  return (
    <div>
      <h1>원자재 재고 확인</h1>
      <table>
        <thead>
          <tr>
            <td>이름</td>
            <td>사이즈</td>
            <td>가격</td>
            <td>브랜드</td>
          </tr>
        </thead>
        <tbody>
          {stocks ? stocks.map((stock) =>
          <tr key={stock.원자재ID}>
            <td>{stock.이름}</td>
            <td>{stock.사이즈}</td>
            <td>{stock.가격}</td>
            <td>{stock.브랜드}</td>
            <td><Link to={`/production/stock/${stock.원자재ID}`}>▶재고확인(detail)</Link></td>
          </tr>) :
          <tr>
            <td>NOT YET</td>
          </tr>}
        </tbody>
      </table>
      <h1>제품 재고 확인</h1>
      <table>
        <thead>
          <tr>
            <td>이름</td>
            <td>사이즈</td>
            <td>가격</td>
            <td>브랜드</td>
          </tr>
        </thead>
        <tbody>
          {products ? products.map((product) =>
          <tr key={product.제품ID}>
            <td>{product.제품ID}</td>
            <td><Link to={`/production/product/${product.제품ID}`}>▶재고확인(detail)</Link></td>
          </tr>) :
          <tr>
            <td>NOT YET</td>
          </tr>}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;
