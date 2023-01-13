import styles from "../Sales/Sales.module.css";
import axios from "axios";
import { useState , useEffect } from "react";



const Sales = () => {
    // const [product,setProduct] = useState();
    // const getProduct = async () => {
    //     const url = "/api/product";
    //     const response = await axios.get(url);
    //     setProduct(response.data);
    // };
    // useEffect(()=>{
    //     console.log(product);
    // },[])
    
    return (
        <div>
            <div className={styles.salestitle}>
                <h1> Sales </h1> </div>
            <div className={styles.salesmain}>
                <div className={styles.salesmenu}>
                    <tr>
                        <button className={styles.product_btn1}> 상품 1 </button>
                        <button className={styles.product_btn_ex1}> 상품 1 </button>
                        <button className={styles.product_btn_ex2}> 상품 1 </button>
                        <button className={styles.product_btn1}> 상품 1 </button>
                        <button className={styles.product_btn1}> 상품 1 </button>
                        <button className={styles.product_btn1}> 상품 1 </button>
                    </tr>
                    <tr>
                        <button className={styles.product_btn2}> 상품 2 </button>
                        <button className={styles.product_btn2}> 상품 2 </button>
                        <button className={styles.product_btn2}> 상품 2 </button>
                        <button className={styles.product_btn2}> 상품 2 </button>
                        <button className={styles.product_btn2}> 상품 2 </button>
                        <button className={styles.product_btn2}> 상품 2 </button>
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