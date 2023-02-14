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
            <Link to ='/dashboard'> <div className={styles.dashboard}> 대시보드 </div> </Link>
            <Link to ='/production'><div> 생산 </div></Link>
            <Link to ='/production/add-material'><div> 재료 추가 </div></Link>
            <Link to ='/sales'><div> 판매 </div></Link>
            <Link to ='/customers'> <div> 고객 </div></Link>
            <Link to ='/reports'> <div> 리포트 </div></Link>
        </div>
    );
}

export default SideBar;