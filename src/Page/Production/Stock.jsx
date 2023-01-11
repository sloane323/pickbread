import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const Stock = () => {
  const params = useParams();
  const id = params.id;
  return (
    <div>
      <h1>생산 - 상품 재고 확인</h1>
      <Link to={`/production/stock/${id}`}>▶재고확인(detail)</Link>
    </div>
  );
};

export default Stock;

