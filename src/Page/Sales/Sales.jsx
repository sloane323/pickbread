import styles from "../Sales/Sales.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SelectList from "../../components/sales/SelectList";
import CustomerList from "./CustomerList";
import PaymentMode from "./PaymentMode";
import TotalCost from "../../components/sales/TotalCost";
const Sales = () => {
  const [product, setProduct] = useState("");
  const [customer, setCustomer] = useState("");
  const [p_stock, setP_stock] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);

  const [selectedP_stock, setSelectedP_stock] = useState("");

  const [selectProduct, setSelectProduct] = useState();
  const [saleDate, setSaleDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [totalCost, setTotalCost] = useState();

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
    const url = "/api/product";
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
    getProduct();
    getCustomer();
    getP_stock();
  }, []);

  const log = () => {
    console.log("product", product);
    console.log("customer", customer);
    console.log("p_stock", p_stock);
    console.log("selectedProduct", [...selectedProduct]);
  };

  // 버튼눌렀을때 id, name , amount , price를 구해오는 함수
  const btnClick = (e) => {
    const id = e.target.value;
    const name = selectProductName(id);
    let amount = 1;
    const price = selectProductPriceHandler(id);
    const selectProduct = [id, name, amount, price];
    selectProductHandler(selectProduct);
  };
  // for문 => foreach문으로 교체
  // 버튼을 눌렀을때ID(a)와 제품ID가 같은 데이터의 이름을 불러옴
  const selectProductName = (a) => {
    let name;
    product.forEach((element) => {
      if (element.제품ID == a) return (name = element.이름);
    });
    return name;
  };

  // for문 => foreach문으로 교체
  // 버튼을 눌렀을때ID(a)와 제품ID가 같은 데이터의 가격을 불러옴
  const selectProductPriceHandler = (a) => {
    let price = 0;
    product.forEach((element) => {
      if (element.제품ID == a) return (price = element.가격);
    });
    return price;
  };

  // 02/22 foreach문 -> findIndex로 수정
  const selectProductHandler = (selectProduct) => {
    const index = selectedProduct.findIndex(
      (element) => element[0] === selectProduct[0]
    );
    if (index === -1) {
      setSelectedProduct((prev) => [...prev, selectProduct]);
    } else {
      const updateSelectedProduct = [...selectedProduct];
      selectedProduct[index][2] += 1;
      setSelectedProduct(updateSelectedProduct);
    }
  };

  // 총 합 가격 함수
  const totalCostHandler = () => {
    let eachTCost = 0;
    let totalCost = 0;
    selectedProduct.map((element) => {
      eachTCost = element[2] * element[3];
      totalCost += eachTCost;
      return totalCost;
    });
    setTotalCost(totalCost);
  };

  // 구매눌렀을대 올라갈 데이터(임시)
  const saleslog = () => {
    const url = "/api/sales";
    const salesID = Math.random().toString(32).slice(2);
    const formData = new FormData();
    formData.append("productID", product);
    formData.append("customerID", customer);
    formData.append("salesID", salesID);
    formData.append("purchaseDate", saleDate);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    return axios.post(url, formData, config);
  };

  useEffect(() => {
    totalCostHandler();
  }, [selectedProduct]);
  return (
    <div>
      <div className={styles.salestitle}>
        <h1> Sales </h1>{" "}
      </div>
      <button onClick={() => log()}>test</button>

      <button className={styles.product_btn3} onClick={openModal}>
        고객추가
      </button>
      <CustomerList open={modalOpen} close={closeModal} />
      <button className={styles.product_btn3} onClick={openModal1}>
        결제하기
      </button>
      <PaymentMode open={modalOpen1} close={closeModal1} />

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
                  <button
                    onClick={(e) => btnClick(e)}
                    className={styles.product_btn1}
                    value={product.제품ID}
                  >
                    {" "}
                    {product.이름}
                  </button>
                );
              })}
          </tr>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <table>
              <tr>
                <td> no. </td>
                <td> 상품 </td>
                <td> 갯수 </td>
                <td> 개당가격 </td>
                <td> 상품가격 </td>
              </tr>
              <SelectList selectedProduct={selectedProduct} />
            </table>
          </div>
          <div className={styles.bottomRight}>
            <table>
              <tr>
                <td>총 가격 </td>
              </tr>
              <TotalCost totalCost={totalCost} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
