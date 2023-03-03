import Customers from "./Customers";
import AddVender from "../Production/AddVendor";
import styles from "./VenderNCustomer.module.css"
import {useState } from "react";


const VenderNCustomer = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabClickHandler=(index)=>{
        setActiveIndex(index);
    };

    const tabContArr=[
        {
            tabTitle:(
                <button className={activeIndex===0 ? "active" : ""} 
                onClick={()=>tabClickHandler(0)}> 고객 </button>
            ),
            tabCont:(
                <div> <br /><Customers /> </div>
            )
        },
        {
            tabTitle:(
                <button className={activeIndex===1 ? "active " : ""} 
                onClick={()=>tabClickHandler(1)}> 거래처 </button>
            ),
            tabCont:(
                <div> <AddVender /></div>
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