import DisplayValue from "./Payment/DisplayValue";
import { useState } from "react";
import Customers from "../Customer/Customers";

const SalesData = () => {

    const [selectedValue, setSelectedValue] = useState(null);
    const [salesData, setSalesData] = useState([]);
    
    const sendToSalesData = (customer) => {
    setSalesData([...salesData, customer]);
    };
    
    

    return ( <div>

<div>
 </div>
             <span>고객이름 : {고객ID}</span>  
             <span>사용포인트 : </span> 
             <span>결제모드 :    <DisplayValue selectedValue={selectedValue} />  </span> 
         <br />

    
         {salesData.map((customer) => (
    <div key={customer.id}>
      <span>고객이름: {customer.name}</span>
      <span> 사용포인트: {customer.points}</span>
      <span> 결제모드: </span>
      <DisplayValue selectedValue={selectedValue} />
    </div>
  ))}
    </div> );
}
 
export default SalesData;