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

  const [clickedButton, setClickedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleButtonClick = (button) => {
    setClickedButton(button);
  };

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const getButtonStyle = (button) => {
    if (button === clickedButton) {
      return {
        fill: "white"
      };
    } else if (button === hoveredButton) {
      return {
        fill: "white"
      };
    } else {
      return {
        fill: "black"
      };
    }
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
      <div className={styles.iconinner}>
        <Link 
          to="/dashboard" 
          className={styles.dashboard} 
          onClick={() => handleButtonClick("dashboard")}
          onMouseEnter={() => handleMouseEnter("dashboard")}
          onMouseLeave={handleMouseLeave}
          style={getButtonStyle("dashboard")}
        >
          <Icon1> </Icon1>
        </Link>
        </div>
        
        <div className={styles.iconinner}>
        <Link to="/production" className={styles.dashboard}>
        <Gear /> 
        </Link>
        </div>

        <div className={styles.iconinner}>
        <Link to="/sales" className={styles.dashboard}>
          <Sales />
        </Link>
        </div>

        <div className={styles.iconinner}>
        <Link to="/VenderNCustomer" className={styles.dashboard}>
          <User />
        </Link>
        </div>

        <div className={styles.iconinner}>
        <Link to="/reports" className={styles.dashboard}>
         <Report />
        </Link>
        </div>

        </div> 
        
        
        </div>
    
    
  );
};

export default SideBar;