import React from "react";
import { Link  } from "react-router-dom";
import styles from "../SideBar/SideBar.module.css";
import { ReactComponent as Breadicon } from "../SideBar/Breadicon.svg";

const SideBar = () => {

    return ( 
        <div className={styles.sidebar}>
           <div className={styles.icon}> <Breadicon width="3em" height="3em" />  </div>
        <div className={styles.mapsidebar}>
            <Link to ='/dashboard' className={styles.dashboard}>  대시보드  </Link>
            <Link to ='/production' className={styles.dashboard}><div> 생산 </div></Link>
            <Link to ='/sales' className={styles.dashboard}><div> 판매 </div></Link>
            <Link to ='/VenderNCustomer' className={styles.dashboard}> <div> 고객&밴더 </div></Link>
            <Link to ='/reports' className={styles.dashboard}> <div> 리포트 </div></Link>
        </div>
        </div>
    );
}

export default SideBar;