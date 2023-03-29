import { useState } from "react";
import PointModal from "./PointModal";
import style from "../Sales/SalesButton.module.css";
import styles from "./Modal.module.css";
import Customers from "../Customer/Customers";
import PaymentMain from "./Payment/PaymentMain";



const SalesButton = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const { selectedProduct , totalPrice , setSelectedProductHandler ,setSelectedCustomer, selectedCustomer, customerTest, setCustomerTest }= props
    const modalHandler = () => {
      setModalOpen(!modalOpen)
     };
     const modalHandler1 = () => {
      setModalOpen1(!modalOpen1)
     };
     const modalHandler2 = () => {
      setModalOpen2(!modalOpen2)
     };

     const handleClosePage = () => {
      modalHandler();
    };
    const handelClosePage1 =()=>{
      modalHandler1()
    }

    return ( <div>
    <div className={style.buttondisplay}>
            <button onClick={modalHandler} >고객</button>
            <div className={modalOpen ? styles.modal : styles.hidden}>
              <div className={styles.modalContent}>
                <span className={styles.close} >
                  <button onClick={handleClosePage}> X </button>
                  <button onClick={handleClosePage}>고객선택</button>

                <Customers 
                modalHandler={modalHandler} 
                setSelectedCustomer={setSelectedCustomer}
                customerTest={customerTest}
                setCustomerTest={setCustomerTest}
                />
                </span>
              </div>
            </div>
            <button onClick={modalHandler1}>포인트사용</button>
            <div className={modalOpen1 ? styles.modal : styles.hidden}>
              <div className={styles.modalContent}>
              <button onClick={handelClosePage1}> X </button>
                <span className={styles.close}>
                <PointModal modalHandler1={modalHandler1}/>
                </span>
              </div> 
            </div>
            <button onClick={modalHandler2}>결제모드</button>
            <div className={modalOpen2 ? styles.modal : styles.hidden}>
              <div className={styles.modalContent}>
                <span className={styles.close} >
                <PaymentMain selectedProduct={selectedProduct} 
                totalPrice={totalPrice} 
                modalHandler2={modalHandler2} 
                setSelectedProductHandler={setSelectedProductHandler} 
                selectedCustomer={selectedCustomer}
                />
              </span>
              </div>
            </div>

            </div>
    </div> );
}
 
export default SalesButton;

