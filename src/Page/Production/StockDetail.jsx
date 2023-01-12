import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const StockDetail = () => {
  const { id } = useParams();
  const [stocks, setStocks] = useState(null)

  const getStock = async () => {
    try {
      const response = await axios.get(`/api/currentstock`);
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStock();
  }, [id])

  return (
    <div>
      <h1>상품 재고확인 상세 페이지</h1>
      {id}
    </div>
  );
};

export default StockDetail;
