import { useState } from "react";
import style from "../Sales/SalesButton.module.css";
import styles from "./Modal.module.css";
import Customers from "../Customer/Customers";




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
            <button onClick={modalHandler} >고객선택</button>
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
            

            <button onClick={modalHandler} >비회원</button>
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


            </div>
    </div> );
}
 
export default SalesButton;

