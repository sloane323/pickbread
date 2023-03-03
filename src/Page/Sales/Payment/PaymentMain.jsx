import axios from "axios";
import { useEffect , useState } from "react";

const PaymentMain = (props) => {
    const {selectedProduct , salesLog} = props;
    const [p_stock, setP_stock] = useState("");


    const getP_stock = async () => {
      const url = "/api/p_stock";
      const response = await axios.get(url);
      setP_stock(response.data);
  };
  useEffect(()=>{
    getP_stock()
  },[])


    console.log('selectedProduct',selectedProduct);
    console.log('p_stock',p_stock);

    const payment = ()=>{
      // 재고의 갯수에서 구매하는 제품의 갯수만큼 빼는 함수  
      let id = '';
      let amount = 0 ;
      const p_stockRows = p_stock.length
      const selectedProductRows = selectedProduct.length
      const rows = Math.min(p_stockRows , selectedProductRows);
      for(let i = 0 ; i < rows ; i++){
        if(p_stock[i][5] === selectedProduct[i][0]){
          id = selectedProduct[i][0];
          amount = selectedProduct[i][2];
          console.log('id',id);
          console.log('amount',amount);
        }
      }
    }
  
  return ( 
    <div>
      <button> 포인트 </button>
      <button> 할인 </button>
      <button onClick={()=>{payment()}}> 결제 </button>
    </div>
      );
}
 
export default PaymentMain;