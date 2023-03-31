import DisplayValue from "./Payment/DisplayValue";
import { useState } from "react";
import Customers from "../Customer/Customers";

const SalesData = (props) => {
  const [salesData, setSalesData] = useState([]);
  const { customerTest } = props;


  return (
    <div>
      
      {customerTest.length > 0
        ? customerTest.map((customer) => (
            <div key={customer.id}>
              <span>고객이름: {customer.이름}</span>
              <span> 사용 가능 포인트: {customer.포인트}</span>
             <span> 사용포인트 : 
              <input type="number" min="0" max='maxnumber'/> </span>
              <span> 결제모드: </span>
              <button value="카드" > 카드 </button>
              <button value="현금" > 현금 </button>
            </div>
          ))
        : ""}
    </div>
  );
};

export default SalesData;
