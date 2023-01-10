import { useNavigate } from "react-router";

// 생산 페이지
const Production = () => {

    const navigate = useNavigate();

    return (  
    <div>
        <h1>Production Page</h1>
        <span onClick={()=>{navigate('/production/add-material')}}>▶원자재 등록</span>
        <span onClick={()=>{navigate('/production/purchase')}}>▶원자재 구매</span>
        <span onClick={()=>{navigate('/production/add-product')}}>▶제품 등록</span>
        <span onClick={()=>{navigate('/production/add-vendor')}}>▶거래처 등록</span>
        <span onClick={()=>{navigate('/production/stock')}}>▶재고확인</span>
    </div> 
    );
}

export default Production; 