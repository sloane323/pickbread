import { Link } from "react-router-dom";

// 생산 페이지
const Production = () => {


    return (  
    <div>
        <h1>Production Page</h1>
        <Link to ='/production/add-material'>▶원자재 등록</Link>
        <Link to ='/production/purchase'>▶원자재 구매</Link>
        <Link to ='/production/add-product'>▶제품 등록</Link>
        <Link to ='/production/add-vendor'>▶거래처 등록</Link>
        <Link to ='/production/stock'>▶재고확인</Link>
    </div> 
    );
}

export default Production; 