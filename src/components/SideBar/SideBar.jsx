import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../SideBar/SideBar.module.css";
import { ReactComponent as Breadicon } from "../SideBar/Breadicon.svg";
import { ReactComponent as Icon1 } from "../SideBar/Icon1.svg";
import { ReactComponent as User  } from "../SideBar/User.svg";
import { ReactComponent as Sales } from "../SideBar/Sales.svg";
import { ReactComponent as Report } from "../SideBar/Report.svg";
import { ReactComponent as Gear } from "../SideBar/Gear.svg";


const SideBar = () => {

  const [active, setActive] = useState(true); 


  const [icons, setIcons] = useState([
    { name: "dashboard", active: true },
    { name: "production", active: false },
    { name: "sales", active: false },
    { name: "venderNCustomer", active: false },
    { name: "reports", active: false }
  ]);

  const handleIconClick = (index) => {
    const updatedIcons = [...icons];
    updatedIcons.forEach((icon, i) => {
      icon.active = i === index;
    });
    setIcons(updatedIcons);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.icon}>
        <svg style={{ width: "3em", height: "3em" }}>
          <Breadicon></Breadicon>
        </svg>
      </div>

      <div className={styles.mapsidebar}></div> 

      <div  className={styles.un1} >
      {icons.map((icon, index) => (
        <div
          key={index}
          className={`${styles.iconinner} ${icon.active ? styles.active : ""}`}
        >
          <Link
            to={`/${icon.name}`}
            className={styles.dashboard}
            onClick={() => handleIconClick(index)}
          > 
            {icon.name === "dashboard" && <Icon1 className={styles.iconss} />}
            {icon.name === "production" && <Gear className={styles.iconss} />}
            {icon.name === "sales" && <Sales className={styles.iconss} />}
            {icon.name === "venderNCustomer" && <User className={styles.iconss} />}
            {icon.name === "reports" && <Report className={styles.iconss} />}

          </Link>
        </div>
      ))}

     

            </div> 
        </div>
    
    
  );
};

export default SideBar;