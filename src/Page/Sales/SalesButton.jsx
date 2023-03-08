import { useState } from "react";
import CustomerList from "./CustomerList";
import PaymentMode from "./PaymentMode";
import PointModal from "./PointModal";
import styles from "./Modal.module.css";



const SalesButton = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);

    const openModal = () => { setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); };

    const openModal1 = () => { setModalOpen1(true);  };
    const closeModal1 = () => { setModalOpen1(false);};

    const openModal2 = () => {setModalOpen2(true); };
    const closeModal2 = () => { setModalOpen2(false); };

    return ( <div>
    <div className={styles.buttondisplay}>
            <button onClick={openModal} >고객</button>
            <div className={modalOpen ? "" : styles.modal}>
              <div className={styles.modalContent}>
                <span className={styles.close} onClick={closeModal}>  X  </span>
                <CustomerList />
              </div>
            </div>
            <button onClick={openModal2}>포인트사용</button>
            <div className={modalOpen2 ? "" : styles.modal}>
              <div className={styles.modalContent}>
                <span className={styles.close} onClick={closeModal2}> X</span>
                <PointModal />
              </div>
            </div>
            <button onClick={openModal1}>결제하기</button>
            <div className={modalOpen1 ? styles.modal : styles.hidden}>
              <div className={styles.modalContent}>
                <span className={styles.close} onClick={closeModal1}> X </span>
                <PaymentMode />
              </div>

            </div>
            </div>
    </div> );
}
 
export default SalesButton;