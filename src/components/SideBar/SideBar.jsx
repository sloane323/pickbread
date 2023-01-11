import { Link } from "react-router-dom";
import styles from "../SideBar/SideBar.module.css";
const SideBar = () => {
    return ( 
        <div className={styles.sidebar}>
            <Link to ='/dashboard'> <div className={styles.dashboard}> 대시보드 </div> </Link>
            <Link to ='/production'><div> 생산 </div></Link>
            <Link to ='/sales'><div> 판매 </div></Link>
            <Link to ='/customers'> <div> 고객 </div></Link>
            <Link to ='/reports'> <div> 리포트 </div></Link>

        </div>
    );
}

export default SideBar;