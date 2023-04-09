import { useState } from "react";

const SalesData = (props) => {
  const { customerTest } = props;
  const [paymentMode, setPaymentMode] = useState("");
  const handleButtonClick = (event) => {
      const { value } = event.target;
      setPaymentMode(value);
      console.log(value);
      // do something with the paymentMode value, such as send it to the server
    };
  return (
    <div>
      
      {customerTest.length > 0
        ? customerTest.map((customer) => (
            <div key={customer.id}>
              <span>고객이름: {customer.이름}</span>
              <span> 사용 가능 포인트: {customer.포인트}</span>
             <span> 사용포인트 : 
              <input type="number" min="0" max={customer.포인트} step="100" /> </span>
              <div>
              <span>결제모드: {paymentMode}</span>
      <button value="카드" onClick={handleButtonClick}>
        카드
      </button>
      <button value="현금" onClick={handleButtonClick}>
        현금
      </button>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default SalesData;
