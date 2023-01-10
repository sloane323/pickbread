import { useNavigate } from "react-router";

const Stock = () => {
    
    const navigate = useNavigate();
    
    
    return (
        <div>
            <h1>생산 - 상품 재고 확인</h1>
            <span onClick={()=>{navigate(`/production/stock/{id}`)}}>▶재고확인(detail)</span>
        </div>
    );
}

export default Stock;