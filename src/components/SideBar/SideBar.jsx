import React from "react";
import { Link } from "react-router-dom";
import styles from "../SideBar/SideBar.module.css";
import { ReactComponent as Breadicon } from "../SideBar/Breadicon.svg";
import { ReactComponent as Icon1 } from "../SideBar/Icon1.svg";
import { ReactComponent as User  } from "../SideBar/User.svg";
import { ReactComponent as Sales } from "../SideBar/Sales.svg";
import { ReactComponent as Report } from "../SideBar/Report.svg";
import { ReactComponent as Gear } from "../SideBar/Gear.svg";


const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.icon}>
        <svg style={{ width: "3em", height: "3em" }}>
          <Breadicon></Breadicon>
        </svg>
      </div>
      <div className={styles.mapsidebar}>
        <Link to="/dashboard" className={styles.dashboard}>
        <Icon1> </Icon1>
        </Link>

        <Link to="/production" className={styles.dashboard}>
        <Gear> </Gear>
        </Link>

        <Link to="/sales" className={styles.dashboard}>
          <Sales />
        </Link>

        <Link to="/VenderNCustomer" className={styles.dashboard}>
          <User />
        </Link>

        <Link to="/reports" className={styles.dashboard}>
         <Report />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
