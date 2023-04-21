import React from "react";
import { Link  } from "react-router-dom";
import styles from "../SideBar/SideBar.module.css";
import { ReactComponent as Breadicon } from "../SideBar/Breadicon.svg";

const SideBar = () => {

    return ( 
        <div className={styles.sidebar}>
           <div className={styles.icon}> <i class="fa-regular fa-earth-americas fa-2xs" style="color: #000000;"></i>  </div>
        <div className={styles.mapsidebar}>
            <Link to ='/dashboard' className={styles.dashboard}>  대시보드  </Link>
            <Link to ='/production' className={styles.dashboard}><div> 생산 </div></Link>
            <Link to ='/sales' className={styles.dashboard}><div> 판매 </div></Link>
            <Link to ='/VenderNCustomer' className={styles.dashboard}> <div> 고객&거래처 </div></Link>
            <Link to ='/reports' className={styles.dashboard}> <div> 리포트 </div></Link>
        </div>
        </div>
    );
}

export default SideBar;