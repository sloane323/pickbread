import styles from "../SideBar/SideBar.module.css";
const SideBar = () => {
    return ( 
        <div className={styles.sidebar}>
            <div className={styles.dashboard}> 대시보드 </div>
            <div> 생산 </div>
            <div> 판매 </div>
            <div> 고객 </div>
            <div> 리포트 </div>

        </div>
     );
}
 
export default SideBar;