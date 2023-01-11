import React from "react";
import { Link , useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
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
        <div className={styles.sidebar}>

<div className={styles.mapsidebar}>
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index} className={styles.links}>
            <SidebarItem
              menu={menu}
              isActive={pathName === menu.path ? true : false}
              	// 현재 URL pathname과 객체에 담긴 path값 일치 여부 확인
            />
          </Link>
        );
      })}
    </div>

        </div>
    );
}

export default SideBar;