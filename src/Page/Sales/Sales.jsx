import styles from "../Sales/Sales.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SelectList from "../../components/sales/SelectList";

import TotalCost from "../../components/sales/TotalCost";
import SalesButton from "./SalesButton";
const Sales = () => {
    const [product, setProduct] = useState("");
    const [customer, setCustomer] = useState("");
    const [p_stock, setP_stock] = useState("");
    const [selectedProduct, setSelectedProduct] = useState([])
    const [selectProduct, setSelectProduct] = useState();
    const [saleDate, setSaleDate] = useState(new Date().toISOString().slice(0, 10));
    const [totalPrice, setTotalPrice] = useState();
    const [manufacture, setMnaufacture] = useState();



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

    const getManufacture = async ()=>{
        const url = "/api/manufacture";
        const response = await axios.get(url);
        setMnaufacture(response.data)
    }
    
    const setSelectedProductHandler =()=>{
        setSelectedProduct([])
    }
    useEffect(() => {
        getProduct()
        getCustomer()
        getP_stock()
        getManufacture()
    }, [])

    const log = () => {
        console.log('product', product);
        console.log('customer', customer);
        console.log('p_stock', p_stock);
        console.log('selectedProduct', [...selectedProduct]);
        console.log('manufacture',manufacture);
    }


    // 버튼눌렀을때 id, name , amount , price를 구해오는 함수
    const btnClick = (e) => {
        const id = e.target.value;
        const name = selectProductName(id);
        let amount = 1;
        const price = selectProductPriceHandler(id);
        const selectProduct = [id, name, amount, price];
        selectProductHandler(selectProduct)

    }
    // for문 => foreach문으로 교체
    // 버튼을 눌렀을때ID(a)와 제품ID가 같은 데이터의 이름을 불러옴
    const selectProductName = (a) => {
        let name;
        product.forEach((element) => {
            if (element.제품ID == a)
                return name = element.이름
        })
        return name
    }

    // for문 => foreach문으로 교체
    // 버튼을 눌렀을때ID(a)와 제품ID가 같은 데이터의 가격을 불러옴
    const selectProductPriceHandler = (a) => {
        let price = 0;
        product.forEach((element) => {
            if (element.제품ID == a)
                return price = element.가격
        })
        return price;
    }

    // 02/22 foreach문 -> findIndex로 수정 
    const selectProductHandler = (selectProduct) => {
        const index = selectedProduct.findIndex((element) => element[0] === selectProduct[0]);
        if (index === -1) {
            setSelectedProduct(prev => [...prev, selectProduct])
        } else {
            const updateSelectedProduct = [...selectedProduct];
            selectedProduct[index][2] += 1;
            setSelectedProduct(updateSelectedProduct)
        }
    }

    // 총 합 가격 함수
    const totalPriceHandler = () => {
        let eachTPrice = 0;
        let totalPrice = 0;
        selectedProduct.map((element) => {
            eachTPrice = element[2] * element[3];
            totalPrice += eachTPrice;
            return totalPrice
        })
        setTotalPrice(totalPrice);
    }

   

    useEffect(() => {
        totalPriceHandler()
    }, [selectedProduct])

    return (
        <div>
            <div className={styles.salestitle}>
                <h1> Sales </h1> </div>
                <div> 
                    <SalesButton />
                </div>
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
                                    <button onClick={(e) => btnClick(e)} className={styles.product_btn1} value={product.제품ID}> {product.이름}</button>
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
                            <SelectList selectedProduct={selectedProduct} totalPrice={totalPrice} />
                        </table>
                    </div>
                    <div className={styles.bottomRight}>
                        <table>
                            <tr>
                                <td>총 가격 </td>
                            </tr>
                            <TotalCost totalPrice={totalPrice} />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sales;