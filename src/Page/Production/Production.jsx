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
  const goToMaterialPage = () => {
    navigate("/production/material-page");
  }
  const goToProductPage = () => {
    navigate("/production/product-page");
  }
  const goToTotalStocksPage = () => {
    navigate("/production/total-stocks-page");
  }

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
      <button onClick={goToMaterialPage}>원자재 페이지</button>
      <br></br>
      <br></br>
      <button onClick={goToProductPage}>제품 페이지</button>
      <button onClick={goToTotalStocksPage}>총 재고 페이지</button>
    </div>
  );
};

export default Production;
