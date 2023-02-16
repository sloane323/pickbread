import React from "react";
import { Link , useLocation } from "react-router-dom";
import styles from "../SideBar/SideBar.module.css";
const SideBar = () => {
    const pathName = useLocation().pathname;

    const menus = [
        { name: "홈", path: "/" },
        { name: "대시보드", path: "/dashboard" },
        { name: "생산", path: "/production" },
        { name: "판매", path: "/sales" },
        { name: "고객", path: "/customers" },
        { name: "리포트", path: "/reports" }
      ];

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