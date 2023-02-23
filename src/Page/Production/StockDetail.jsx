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

  const disposeStockHandler = async (id, dispose) => {
    const url = `/api/m_stock/dispose/${id}`;
    await axios.put(url, { dispose });
    getStock();
  };

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
            <td>폐기여부</td>
            <td>폐기여부설정</td>
            <td>현재가격</td>
            <td>기준가격</td>
            <td>카테고리</td>
            <td>유효기한</td>
            <td>브랜드</td>
            <td>낱개바코드</td>
            <td>박스바코드</td>
            <td>원산지</td>
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
              <td>{stock.폐기여부 ? "O" : "X"}</td>
              <td>
                <button onClick={() => disposeStockHandler(stock.재고ID, stock.폐기여부)}>{stock.폐기여부 ? "폐기취소" : "폐기"}</button>
              </td>
              <td>{stock.현재가격}</td>
              <td>{stock.기준가격}</td>
              <td>{stock.카테고리}</td>
              <td>{stock.유효기한}</td>
              <td>{stock.브랜드}</td>
              <td>{stock.낱개바코드}</td>
              <td>{stock.박스바코드}</td>
              <td>{stock.원산지}</td>
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
