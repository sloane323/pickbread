import { useState } from "react";
import CustomerList from "./CustomerList";
import PaymentMode from "./PaymentMode";
import PointModal from "./PointModal";
import styles from "../Sales/SalesButton.module.css";

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
            <button onClick={openModal} >고객추가</button>
            <CustomerList open={modalOpen} close={closeModal} />
            <button onClick={openModal2}>포인트사용</button>
            <PointModal open={modalOpen2} close={closeModal2} />
            <button onClick={openModal1}>결제하기</button>
            <PaymentMode open={modalOpen1} close={closeModal1} />
            </div>
    </div> );
}
 
export default SalesButton;