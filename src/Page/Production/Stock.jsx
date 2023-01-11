import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Stock = () => {
  const params = useParams();
  const id = params.id;
  const [stocks, setStocks] = useState(null);

  const getStock = async () => {
    try {
      const response = await axios.get(`/api/material`);
      console.log(response.data)
      setStocks(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStock();
  }, [id]);

  return (
    <div>
      <h1>생산 - 상품 재고 확인</h1>
      <table>
        <thead>
          <tr>
            <td>원자재ID</td>
            <td>이름</td>
            <td>사이즈</td>
            <td>가격</td>
            <td>브랜드</td>
          </tr>
        </thead>
        <tbody>
          {stocks ? stocks.map((stock) =>
          <tr key={stock.원자재ID}>
            <td>{stock.원자재ID}</td>
            <td>{stock.이름}</td>
            <td>{stock.사이즈}</td>
            <td>{stock.가격}</td>
            <td>{stock.브랜드}</td>
          </tr>) :
          <tr>
            <td>NOT YET</td>
          </tr>}
        </tbody>
      </table>

      <Link to={`/production/stock/${id}`}>▶재고확인(detail)</Link>
    </div>
  );
};

export default Stock;
