import { useNavigate } from 'react-router-dom';
import styles from "./Production.module.css";

// 생산 페이지
const Production = () => {
  const navigate = useNavigate();

  const goToMaterialIndexPage = () => {
    navigate("/production/material");
  }
  const goToProductPage = () => {
    navigate("/production/product");
  }
  const goToTotalStocksPage = () => {
    navigate("/production/total-stocks");
  }

  return (
    <div className={styles.producrtionmain}>
      <div className={styles.ineer}>
      <h1>원자재, 제품, 재고</h1>
      <div className={styles.buttonlist}>
      <div>
        <button onClick={goToMaterialIndexPage}>원자재 페이지</button>
      </div>
      <div>
        <button onClick={goToProductPage}>제품 페이지</button>
      </div>
      <div>
        <button onClick={goToTotalStocksPage}>원자재 및 제품 통합 재고</button>
      </div>
      </div>
        </div>
      </div>
  );
};

export default Production;
