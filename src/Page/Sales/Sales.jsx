import styles from "../Sales/Sales.module.css";
import axios from "axios";
import { useState , useEffect } from "react";



const Sales = () => {
    const [rowData, setRowData] = useState();
    const [inputData, setInputData] =useState([{
        saleslogid: '',
        amount: ''
    }])

    useEffect(async()=>{
        try{
            const res = await axios.get('/api/saleslog')
            const _inputData = await res.data.map((rowData)=>({
                saleslogid: rowData.id,
                amount: rowData.amount
            })
        )
        setInputData(inputData.concat(_inputData))
        } catch(e){
            console.error(e.message)
        }
    },[])
    
    return (
        <div>
            <div className={styles.salestitle}>
                <h1> Sales </h1> </div>
                <button>test</button>
            <div className={styles.salesmain}>
                <div className={styles.salesmenu}>
                    <tr>
                        <button className={styles.product_btn1}> 카테고리 1</button>
                        <button className={styles.product_btn_ex1}> 카테고리 2</button>
                        <button className={styles.product_btn_ex2}> 카테고리 3</button>
                        <button className={styles.product_btn1}> 카테고리 4</button>
                        <button className={styles.product_btn1}> 카테고리 5</button>
                        <button className={styles.product_btn1}> 카테고리 6</button>
                    </tr>
                    <tr>
                        <button className={styles.product_btn2}> 상품 1 </button>
                        <button className={styles.product_btn2}> 상품 2 </button>
                        <button className={styles.product_btn2}> 상품 3 </button>
                        <button className={styles.product_btn2}> 상품 4 </button>
                        <button className={styles.product_btn2}> 상품 5 </button>
                        <button className={styles.product_btn2}> 상품 6 </button>
                    </tr>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.bottomLeft}>
                        <table>
                            <tr>
                                <td> no. </td>
                                <td> 상품 </td>
                                <td>  갯수 </td>
                                <td>  개당가격 </td>
                                <td>  상품가격 </td>
                            </tr>
                            <tr>
                                <td> 1 </td>
                                <td> 단팥빵 </td>
                                <td>  3 </td>
                                <td>  300 </td>
                                <td>  900 </td>
                            </tr>
                        </table>
                    </div>
                    <div className={styles.bottomRight}>

                        <button className={styles.product_btn3}>고객등록</button>
                        <button className={styles.product_btn4}>구매</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sales;