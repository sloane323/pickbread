import DisplayValue from "./Payment/DisplayValue";
import { useEffect, useState } from "react";



const SalesData = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    return ( <div>
                    <div>  <br />
             <span>고객이름 : </span>  
             <span>사용포인트 : </span> 
             <span>결제모드 :    <DisplayValue selectedValue={selectedValue} />  


 </span> 
            </div> <br />
    </div> );
}
 
export default SalesData;