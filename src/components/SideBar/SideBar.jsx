import React from "react";
import { Link  } from "react-router-dom";
import styles from "../SideBar/SideBar.module.css";
const SideBar = () => {

    return ( 
        <div className={styles.mapsidebar}>
            <Link to ='/dashboard' className={styles.dashboard}>  대시보드  </Link>
            <Link to ='/production' className={styles.dashboard}><div> 생산 </div></Link>
            <Link to ='/sales' className={styles.dashboard}><div> 판매 </div></Link>
            <Link to ='/customers' className={styles.dashboard}> <div> 고객 </div></Link>
            <Link to ='/reports' className={styles.dashboard}> <div> 리포트 </div></Link>
        </div>
    );
}

export default SideBar;