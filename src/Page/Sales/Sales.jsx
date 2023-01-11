import styles from "../Sales/Sales.module.css";

const Sales = () => {
    return ( <div>
        <div  className={styles.salestitle}> 
        <h1> Sales </h1> </div>

<div  className={styles.salesmain}>
        <div  className={styles.salesmenu}>
        <tr>
        <button> 상품 1 </button> 
        <button> 상품 1 </button> 
        <button> 상품 1 </button> 
        <button> 상품 1 </button> 
        <button> 상품 1 </button> 
        <button> 상품 1 </button> 
        </tr>
        <tr>
        <button> 상품 1 </button> 
        <button> 상품 1 </button> 
        <button> 상품 1 </button> 
        <button> 상품 1 </button> 
        <button> 상품 1 </button> 
        <button> 상품 1 </button> 
        </tr>
        </div>

        <div  className={styles.sideright}> 
            <div> 전체주문 </div>
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
        </div>

    </div> );
}
 
export default Sales;