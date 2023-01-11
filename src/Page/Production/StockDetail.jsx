import { useParams } from "react-router";

const StockDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>상품 재고확인 상세 페이지</h1>
      {id}
    </div>
  );
};

export default StockDetail;
