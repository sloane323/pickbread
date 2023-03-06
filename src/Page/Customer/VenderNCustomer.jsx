import { useState } from "react";
import AddVendor from "../Production/AddVendor";
import Customers from "./Customers";
import styles from "./VenderNCustomer.module.css";


const VenderNCustomer = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabClickHandler=(index)=> {
        setActiveIndex(index);
    };

    const tabContArr=[
        {
            tabTitle:(
                <button id={styles.buttontab} style={activeIndex===0 ? {backgroundColor:"#ff0000", color : "#fff"} : {}} onClick={()=>tabClickHandler(0)}> 고객 </button>
            ),
            tabCont:(
                <div> <br /><Customers /> </div>
            )
        },
        {
            tabTitle:(
                <button id={styles.buttontab} style={activeIndex===1 ? {backgroundColor:"#ff0000", color : "#fff"} : {}} onClick={()=>tabClickHandler(1)}> 거래처 </button>
            ),
            tabCont:(
                <div> <AddVendor /> </div>
            )
        }
    ];

    return ( 
        <div  className={styles.all}v>
        <div>
          <ul> <h1> 
            {tabContArr.map((section, index)=>{
                return section.tabTitle
            })}</h1>  <hr />
          </ul>
          <div>
          	{tabContArr[activeIndex].tabCont}
          </div>
        </div>
        </div>
      );
}
 
export default VenderNCustomer;