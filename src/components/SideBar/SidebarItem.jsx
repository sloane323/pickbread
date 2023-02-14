import React from "react";
import styles from "../SideBar/SideBar.module.css";


const SidebarItem = ({ menu, isActive }) => {
    return ( <div>

 { isActive === true ? (
    <div className={styles.sidebaritem}>
      <p>{menu.name}</p>
    </div>
  ) : (
    <div className="sidebar-item ">
      <p>{menu.name}</p>
    </div>  )}
    

    </div> )
}
 
export default SidebarItem;