import Customers from "./Customers";
import AddVender from "../Production/AddVendor";
import styles from "./VenderNCustomer.module.css";
import { useState } from "react";

const VenderNCustomer = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const tabContArr = [    {      tabTitle: (      
      <buttons          className={activeIndex === 0 ? "active1" : ""}         
       onClick={() => tabClickHandler(0)}        >          고객        </buttons>      ),    
         tabCont: (        <div>          <br />          <Customers />     
            </div>      ),    },    {    
                
                tabTitle: (      
                
                <buttons       
               className={activeIndex === 1 ? "active1" : ""}    
                     onClick={() => tabClickHandler(1)}        >     
                          거래처        </buttons>      ),      tabCont: (      
                              <div>          <AddVender />        </div>    
                                ),    },  ];

  return (
    <div className={styles.all}>
      <div>
        <h1>고객 & 거래처</h1>
        <div className={styles.tab}>
          {tabContArr.map((section, index) => {
            return section.tabTitle;
          })}
          <hr />
        </div>
        {tabContArr[activeIndex].tabCont}
      </div>
    </div>
  );
};

export default VenderNCustomer;

