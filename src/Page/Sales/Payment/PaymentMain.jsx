import axios from "axios";
import { useEffect, useState } from "react";

const PaymentMain = (props) => {
  const { selectedProduct, totalPrice ,selectedCustomer} = props;
  const [p_stock, setP_stock] = useState("");
  const [idArray, setIdArray] = useState([]);
  const [amountArray, setAmountArray] = useState([])
  const getP_stock = async () => {
    const url = "/api/p_stock";
    const response = await axios.get(url);
    setP_stock(response.data);
  };
  useEffect(() => {
    getP_stock()
  }, []);
  console.log('selectedCustomer',selectedCustomer);
  const handleClosePage=()=>{
    props.modalHandler2()
  }
  const payment = async () => {
    // 재고의 갯수에서 구매하는 제품의 갯수만큼 빼는 함수 
    try {
      const p_stockRows = p_stock.length;
      const selectedProductRows = selectedProduct.length;
      for (let i = 0; i < selectedProductRows; i++) {
        const selectedProductId = selectedProduct[i][0];
        for (let j = 0; j < p_stockRows; j++) {
          if (p_stock[j].제품ID === selectedProductId) {
            idArray.push(selectedProductId);
            amountArray.push(selectedProduct[i][2]);
            break;
          }
        }
      }
      for (let i = 0; i < idArray.length; i++) {
        const response = await axios.put("/api/p_stock", {
          id: idArray[i],
          amount: amountArray[i]
        })
      }
      salesLog()
      productReset()
    } catch (err) {
      console.error('err', err);
    }
  }

  // 고른 상품배열을 초기화하는 함수
  const productReset = ()=>{
    props.setSelectedProductHandler()
  }

  // 구매눌렀을대 올라갈 데이터(임시)
  const salesLog = async () => {
    const url = "/api/sales";
    const salesID = Math.random().toString(32).slice(2);
    const salesDate = new Date().toISOString().slice(0, 10);
    const customerID = `${selectedCustomer.고객ID}`;
    const totalCost = 0;
    const formData = new FormData();
    formData.append("salesID", salesID);
    formData.append("customerID", customerID);
    formData.append("salesDate", salesDate);
    formData.append("totalPrice", totalPrice);
    formData.append("totalCost", totalCost);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    return await axios.post(url, formData, config);

  };



  return (
    <div>
      <button onClick={handleClosePage}> X</button>
      <button> 할인 </button>
      <button onClick={() => { payment() }}> 결제 </button>
    </div>
  );
}

export default PaymentMain;