import { useEffect, useState } from "react";

const Sales = () => {
    const [p_Stock, setP_Stocks] = useState(null);
    const getStocks = async () => {
        const response = await fetch("/api/test");
        const data = await response.json();
        setP_Stocks(data);
        console.log(data);
    };
    useEffect(() => {
        getStocks()
    }, [])
    return (
        (
            <div>

            </div>
        )
        
    );
}

export default Sales;