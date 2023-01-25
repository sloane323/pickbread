import styles from "../Sales/Sales.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SelectList from "./SelectList";



const Sales = () => {
    const [product, setProduct] = useState("");
    const [customer, setCustomer] = useState("");
    const [p_stock, setP_stock] = useState("");
    const [selectedProduct, setSelectedProduct] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState("")
    const [selectedP_stock, setSelectedP_stock] = useState("")
    const [purchaseingProducts, setPurchaingProducts] = useState([])

    const [saleDate, setSaleDate] = useState(new Date().toISOString().slice(0, 10));

    const totalCost = purchaseingProducts

    const getProduct = async () => {
        const url = "/api/product"
        const response = await axios.get(url);
        setProduct(response.data);
    };
    const getCustomer = async () => {
        const url = "/api/customer";
        const response = await axios.get(url);
        setCustomer(response.data);
    };
    const getP_stock = async () => {
        const url = "/api/p_stock";
        const response = await axios.get(url);
        setP_stock(response.data);
    };

    useEffect(() => {
        getProduct()
        getCustomer()
        getP_stock()
    }, [])
    useEffect(() => {
        if (!selectedProduct && product && product.length !== 0) {
            const id = product[0].제품ID;
            const name = product[0].이름;
            const price = product[0].가격;
            setSelectedProduct([])
        }
        // if (!selectedCustomer && customer && customer.length !== 0) {
        //     const id = customer[0].고객ID;
        //     const name = customer[0].이름;
        // }
        // if (!selectedP_stock && p_stock && p_stock.length !== 0) {
        //     const id = p_stock[0].재고ID;
        //     const amount = p_stock.잔량;
        // }
    }, [product, customer, p_stock])

    const log = () => {
        console.log('product', product);
        console.log('customer', customer);
        console.log('p_stock', p_stock);
        console.log('selectedProduct', selectedProduct);
    }

    const selectProductHandler = (e) => {
        const id = e.target.value;
        console.log(product);
        const price = {  } 
        setSelectedProduct([...selectedProduct, id])
    }

    const saleslog = () => {
        const url = "/api/sales";
        const salesID = Math.random().toString(32).slice(2);
        const formData = new FormData();
        formData.append("productID", product);
        formData.append("customerID", customer);
        formData.append("totalCost", totalCost);
        formData.append("salesID", salesID);
        formData.append("purchaseDate", saleDate);
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        return axios.post(url, formData, config);
    };
    // const btnHandler  = async(e)=>{
    //     e.preventDefault();
    //     try {
    //         const res = await s
    //         if ()
    //     } catch(e){
    //         alert('실패')
    //     }
    // }


    return (
        <div>
            <div className={styles.salestitle}>
                <h1> Sales </h1> </div>
            <button onClick={() => log()}>test</button>
            <div className={styles.salesmain}>
                <div className={styles.salesmenu}>
                    {/* <tr>
                        <button className={styles.product_btn1}> 카테고리 1</button>
                        <button className={styles.product_btn_ex1}> 카테고리 2</button>
                    </tr> */}
                    <tr>
                        {product &&
                            product?.map((product) => {
                                return (
                                    <button onClick={(e) => selectProductHandler(e)} className={styles.product_btn1} value={product.제품ID}> {product.제품ID}</button>
                                )
                            })}
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

                                <SelectList selectedProduct={selectedProduct} />

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