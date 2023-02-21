import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const StockDetail = () => {
  const { id } = useParams();
  const [stock, setStock] = useState(null);

  const getStock = async () => {
    try {
      /* 주소에 id 값을 줘서 파라미터로 넘긴다. */
      const response = await axios.get(`/api/currentstock/${id}`);
      /* state로 받아오기 */
      setStock(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(stock);

  useEffect(() => {
    getStock();
  }, [id]);

  return (
    <div>
      <h1>원자재 재고확인 상세 페이지</h1>
      {id}
      <table>
        <thead>
          <tr>
            <td>종류</td>
            <td>사이즈</td>
            <td>개수</td>
            <td>잔량</td>
            <td>사용기한</td>
          </tr>
        </thead>
        <tbody>
          {/* stock도 배열 형태로 되어있다보니,
          위의 getStock에서 인덱스로 처리하거나 map으로 쓰는 방법이 있다. */}
          {stock ? (
            <tr key={stock.재고ID}>
              <td>{stock.종류}</td>
              <td>
                {stock.사이즈}
                {stock.단위}
              </td>
              <td>{stock.개수}</td>
              <td>
                {stock.잔량}
                {stock.단위}
              </td>
              <td>{stock.사용기한}</td>
            </tr>
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

export default StockDetail;
