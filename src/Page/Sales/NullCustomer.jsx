import { useState } from "react";



const NullCustomer = (props) => {
    const [paymentMode, setPaymentMode] = useState("");
    const {nullCustomerData, setNullCustomerData} = props;

    const handleButtonClick = (event) => {
        const { value } = event.target;
        const isChecked = event.target;
        if (isChecked) {
            setPaymentMode(value);
            setNullCustomerData(value)
            console.log(value);
        }else{
            setNullCustomerData()
        };
      };

    return ( <div>
             <span>고객이름: 비회원</span>
            <span> 사용 가능 포인트: 0</span>
             <span> 사용포인트 : 0 </span>
             <div>
             <span>결제모드: {paymentMode}</span>
      <button value="카드" onClick={handleButtonClick}>
        카드
      </button>
      <button value="현금" onClick={handleButtonClick}>
        현금
      </button>
            </div>
    </div> );
}
export default NullCustomer;