import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    try {
      const response = await axios.get(`/api/p_stock/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const disposeStockHandler = async (id, dispose) => {
    const url = `/api/p_stock/dispose/${id}`;
    await axios.put(url, { dispose });
    getProduct()
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <div>
      <h1>제품 재고확인 상세 페이지</h1>
      {id}
      <table>
        <thead>
          <tr>
            <td>이름</td>
            <td>사이즈</td>
            <td>가격</td>
            <td>잔량</td>
            <td>유통기한</td>
            <td>폐기여부</td>
            <td>설정</td>
          </tr>
        </thead>
        <tbody>
          {/* stock도 배열 형태로 되어있다보니,
          위의 getStock에서 인덱스로 처리하거나 map으로 쓰는 방법이 있다. */}
          {product && product[0].재고ID ? (
            product.map((p) => {
              return (
                <tr key={p.재고ID}>
                  <td>{p.이름}</td>
                  <td>
                    {p.사이즈}
                    {p.단위}
                  </td>
                  <td>{p.가격}</td>
                  <td>{p.잔량}</td>
                  <td>{p.유통기한}</td>
                  <td>{p.폐기여부 ? "O" : "X"}</td>
                  <td>
                    <button onClick={() => disposeStockHandler(p.재고ID, p.폐기여부)}>{p.폐기여부 ? "폐기취소" : "폐기"}</button>
                  </td>
                </tr>
              );
            })
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

export default ProductDetail;
