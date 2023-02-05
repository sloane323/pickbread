import styles from "../Sales/Sales.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SelectList from "./SelectList";

const Sales = () => {
    const [product, setProduct] = useState("");
    const [customer, setCustomer] = useState("");
    const [p_stock, setP_stock] = useState("");
    const [selectedProduct, setSelectedProduct] = useState([])

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

    // useEffect(() => {
    //     if (!selectedProduct && product && product.length !== 0) {
    //         const id = product[0].제품ID;
    //         const name = product[0].이름;
    //         const price = product[0].가격;
    //         setSelectedProduct([])
    //     }
    //     // if (!selectedCustomer && customer && customer.length !== 0) {
    //     //     const id = customer[0].고객ID;
    //     //     const name = customer[0].이름;
    //     // }
    //     // if (!selectedP_stock && p_stock && p_stock.length !== 0) {
    //     //     const id = p_stock[0].재고ID;
    //     //     const amount = p_stock.잔량;
    //     // }
    // }, [product, customer, p_stock])

    const log = () => {
        console.log('product', product);
        console.log('customer', customer);
        console.log('p_stock', p_stock);
        console.log('selectedProduct', selectedProduct);
        for (let i = 0; i < product.length; i++) {
            console.log('product제품ID', product[i].제품ID);
        }


    }
    const selectProductName = (a)=>{
        let name = '';
        if (a){
            for (let i = 0 ; i<product.length; i++){
                if (product[i].제품ID === a)
                return name = product[i].이름
            }
        }  return name ;
    }
    
    const selectedProductPriceHandler = (a) => {
        let price;
        if (a) {
            for (let i = 0; i < product.length; i++) {
                if (product[i].제품ID === a)
                    return price = product[i].가격;
            }
        } return price;
    }

    // const selectedProductAmount = (a) => {
    //     let amount = 0;
    //     if (a) {
    //         for (let i = 0; i < product.length; i++) {
    //             if (product[i].제품ID === a)
    //                 return amount += 1;
    //         }
    //     }
    //     return amount;
    // }
    const selectProductHandler = (selectProduct)=>{
        for (let i = 0 ; i<selectedProduct.length; i++){
            if(selectedProduct[i][0] == selectProduct[0])
            return selectedProduct[i][2] += 1 ,selectedProduct[i][3] = selectedProduct[i][2] * selectProduct[3]
        }
        selectedProduct.push(selectProduct)
    }



    const btnClick =  (e) =>  {
        const id = e.target.value;
        const name = selectProductName(id)
        let amount = 1
        let price = selectedProductPriceHandler(id);
        const selectProduct = [id,name,amount,price]
        selectProductHandler(selectProduct)
        console.log('selectProduct' , selectProduct);
        console.log('price', price);
        console.log('name', name);
        console.log('amount', amount);
        console.log('selectedProduct', selectedProduct);

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
                                    <button onClick={(e) => btnClick(e)} className={styles.product_btn1} value={product.제품ID}> {product.제품ID}</button>
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