import axios from "axios";
import { useEffect , useState } from "react";

const PaymentMain = (props) => {
    const {selectedProduct , salesLog} = props;
    const [p_stock , setP_stock] = useState("");
    const [idArray , setIdArray] = useState([]);
    const [amountArray , setAmountArray] = useState([])

    const getP_stock = async () => {
      const url = "/api/p_stock";
      const response = await axios.get(url);
      setP_stock(response.data);
  };
  useEffect(()=>{
    getP_stock()
  },[]);
    
    const payment = async()=>{
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
      for (let i = 0 ; i<idArray.length; i++){
        const response = await axios.put("/api/p_stock",{
          id : idArray[i],
          amount : amountArray[i]
        })
        console.log('response.data',response.data);
      }
    } catch (err) {
      console.error('err',err);
    }
    }
    useEffect(()=>{
      setIdArray([])
      setAmountArray([])
    },[selectedProduct])
  return ( 
    <div>
      <button> 포인트 </button>
      <button> 할인 </button>
      <button onClick={()=>{payment()}}> 결제 </button>
    </div>
      );
}
 
export default PaymentMain;