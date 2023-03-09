import { useState } from "react";
import CustomerList from "./CustomerList";
import PaymentMode from "./PaymentMode";
import PointModal from "./PointModal";
import style from "../Sales/SalesButton.module.css";
import styles from "./Modal.module.css";



const SalesButton = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);

    const modalHandler = () => {
      setModalOpen(!modalOpen)
     };
     const modalHandler1 = () => {
      setModalOpen1(!modalOpen1)
     };
     const modalHandler2 = () => {
      setModalOpen2(!modalOpen2)
     };

    
    return ( <div>
    <div className={style.buttondisplay}>
            <button onClick={modalHandler} >고객</button>
            <div className={modalOpen ? styles.modal : styles.hidden}>
              <div className={styles.modalContent}>
                <span className={styles.close} onClick={modalHandler}>
                <CustomerList />
                </span>
              </div>
            </div>
            <button onClick={modalHandler1}>포인트사용</button>
            <div className={modalOpen2 ? styles.modal : styles.hidden}>
              <div className={styles.modalContent}>
                <span className={styles.close} onClick={modalHandler1}>
                <PointModal />
                </span>
              </div>
            </div>
            <button onClick={modalHandler2}>결제하기</button>
            <div className={modalOpen1 ? styles.modal : styles.hidden}>
              <div className={styles.modalContent}>
                <span className={styles.close} onClick={modalHandler2}>
                <PaymentMode />
              </span>
              </div>
              
            </div>
            </div>
    </div> );
}
 
export default SalesButton;