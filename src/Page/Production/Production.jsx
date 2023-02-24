import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// 생산 페이지
const Production = () => {
  const navigate = useNavigate();

  const addvendor = () => {
    navigate("/production/add-vendor");
  };
  const addmaterial = () => {
    navigate("/production/add-material");
  };
  const purchase = () => {
    navigate("/production/purchase");
  };
  const productionproduct = () => {
    navigate("/production/product");
  };
  const productionmanufacture = () => {
    navigate("/production/manufacture");
  };
  const productionstock = () => {
    navigate("/production/stock");
  };

  return (
    <div>
      <h1>구매&생산</h1>
      <button onClick={addvendor}>거래처 등록</button>
      <button onClick={addmaterial}>원자재 등록</button>
      <br /> <br />
      <button onClick={purchase}>원자재구매</button>
      <button onClick={productionproduct}>제품 등록</button>
      <br />
      <br />
      <button onClick={productionmanufacture}>제품 생산</button>
      <br />
      <br />
      <button onClick={productionstock}>재고확인</button>
    </div>
  );
};

export default Production;
