import React from "react";
import { Link } from "react-router-dom";
import styles from "../SideBar/SideBar.module.css";
import { ReactComponent as Breadicon } from "../SideBar/Breadicon.svg";
import { ReactComponent as Icon1 } from "../SideBar/Icon1.svg";
import { ReactComponent as User } from "../SideBar/User.svg";
import { ReactComponent as Sales } from "../SideBar/Sales.svg";
import { ReactComponent as Barcode } from "../SideBar/Barcode.svg";
import { ReactComponent as Report } from "../SideBar/Report.svg";

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
          <div>
             <Barcode> </Barcode>
          </div>
        </Link>
        <Link to="/sales" className={styles.dashboard}>
          <div> <Sales>  </Sales> </div>
        </Link>
        <Link to="/VenderNCustomer" className={styles.dashboard}>
          {" "}
          <div> <User></User>  </div>
        </Link>
        <Link to="/reports" className={styles.dashboard}>
          {" "}
          <div> <Report></Report>  </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
