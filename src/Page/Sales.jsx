import { useEffect, useState } from "react";

const Sales = () => {
    const [p_Stock, setP_Stocks] = useState(null);
    const getStocks = async () => {
        const response = await fetch("/api/p_stocks");
        const data = await response.json();
        setP_Stocks(data);

    };
    useEffect(() => {
        getStocks()
    }, [])
    return (
        p_Stock && (
            <div>
                <p>재고 ID : {p_Stock[0].stock_id}</p>
            </div>
        )
    );
}

export default Sales;