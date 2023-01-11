import { Link, useParams } from "react-router-dom";

const Stock = () => {
        
        const {id} = useParams();
    return (
        <div>
            <h1>생산 - 상품 재고 확인</h1>
            <Link to={`/production/stock/${id}`}>▶재고확인(detail)</Link>
        </div>
    );
}

export default Stock;