import styles from "../Sales/Sales.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SelectList from "./SelectList";
import PaymentMode from "./PaymentMode";
import CustomerList from "./CustomerList";


const Sales = () => {
    const [product, setProduct] = useState("");
    const [customer, setCustomer] = useState("");
    const [p_stock, setP_stock] = useState("");
    const [selectedProduct, setSelectedProduct] = useState([])

    const [selectedP_stock, setSelectedP_stock] = useState("")
    const [purchaseingProducts, setPurchaingProducts] = useState([])
    const [selectProduct, setSelectProduct] = useState();
    const [saleDate, setSaleDate] = useState(new Date().toISOString().slice(0, 10));
    const totalCost = purchaseingProducts

    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);

    const openModal = () => {
        setModalOpen(true);
      };
      const closeModal = () => {
        setModalOpen(false);
      };

      const openModal1 = () => {
        setModalOpen1(true);
      };
      const closeModal1 = () => {
        setModalOpen1(false);
      };

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

    const log = () => {
        console.log('product', product);
        console.log('customer', customer);
        console.log('p_stock', p_stock);
        console.log('selectedProduct', selectedProduct);
        for (let i = 0; i < product.length; i++) {
           // console.log('product제품이름', product[i].제품이름);
        }
    }
    // for문 => foreach문으로 교체
    // 버튼을 눌렀을때ID(a)와 제품ID가 같은 데이터의 이름을 불러옴
    const selectProductName = (a) => {
        let name = '';
        product.forEach((element) => {
            if (element.제품이름 == a)
                return name = element.이름
        })
        return name
    }
    // for문 => foreach문으로 교체
    // 버튼을 눌렀을때ID(a)와 제품ID가 같은 데이터의 가격을 불러옴
    const selectedProductPriceHandler = (a) => {
        let price;
        product.forEach((element) => {
            if (element.제품ID == a)
                return price = element.가격
        })
        return price;
    }

    // for문 => foreach문으로 교체
    const selectProductHandler = (selectProduct) => {
        if (selectedProduct.length == 0){
            selectedProduct.push(selectProduct)
            // 조건문 수정필요함
        } else if ( selectedProduct ) {
            selectedProduct.push(selectProduct)
        } else {
            selectedProduct.forEach((element, index) => {
                if (element[index] == selectProduct[0]){
                    element[2] += 1;
                }
            });
        }

    }
    // 버튼눌렀을때 id, name , amount , price를 구해오는 함수
    const btnClick = (e) => {
        const id = e.target.value;
        const name = selectProductName(id);
        let amount = 1;
        let price = selectedProductPriceHandler(id);
        const selectProduct = [id, name, amount, price];
        selectProductHandler(selectProduct)
        console.log('selectProduct', selectProduct);
        console.log('selectedProduct', selectedProduct);
    }

    // 구매눌렀을대 올라갈 데이터(임시)
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
    // useEffect 사용해서 selectList 렌더링 시켜야함 

    return (
        <div>
            <div className={styles.salestitle}>
                <h1> Sales </h1> </div>
            <button onClick={() => log()}>test</button>

            <button className={styles.product_btn3} onClick={openModal} >고객추가</button>
            <CustomerList open={modalOpen} close={closeModal} /> 

            <button className={styles.product_btn3} onClick={openModal1}>결제하기</button>
            <PaymentMode open={modalOpen1} close={closeModal1} > </PaymentMode>

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
                                    <button onClick={(e) => btnClick(e)} 
                                    className={styles.product_btn1} value={product.이름}> {product.이름}</button>
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
                        <table>
                            <tr>
                                <td>총 가격 </td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sales;