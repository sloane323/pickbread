import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";


const Dashboard = () => {
  const [vendor, setVendor] = useState();
  const [purchasing, setPurchasing] = useState([]);
  const [customer, setCustomer] = useState();
  const [p_stock, setP_stock] = useState();
  const [product, setProduct] = useState();
  const [dateArray, setDateArray] = useState([]);
  const [chunkedPurchasing, setChunkedPurchasing] = useState([]);

  const [currentStock, setCunrrentStock] = useState([]);
  const [chunkedStock, setChunkedStock] = useState([]);
  const [dispStock, setDisplayStock] = useState([]);
  const [sortedStock, setSortedStock] = useState([]);
  const [manufacture, setManufacture] = useState([]);
  const [todayManu, setTodayManu] = useState([]);
  const [manuArray, setManuArray] = useState([]);

  // 거래처
  const getVendor = async () => {
    const url = "/api/vendor";
    const response = await axios.get(url);
    setVendor(response.data);
  };

  // 원자재구매
  const getPurchasing = async () => {
    const url = "/api/purchasing";
    const response = await axios.get(url);
    setPurchasing(response.data);
  };

  // 고객
  const getCustomer = async () => {
    const url = "/api/customer";
    const response = await axios.get(url);
    setCustomer(response.data);
  };

  // 제품 재고
  const getP_stock = async () => {
    const url = "/api/p_stock";
    const response = await axios.get(url);
    setP_stock(response.data);
  };

  // 제품 받아오기
  const getProduct = async () => {
    const url = "/api/product";
    const response = await axios.get(url);
    setProduct(response.data);
  };

  // 원자재생산 받아오기
  const getCurrnetStock = async () => {
    const url = "/api/m_stock";
    const response = await axios.get(url);
    setCunrrentStock(response.data);
  };

  // 제품생산 받아오기
  const getManufacture = async () => {
    const url = "/api/manufacture";
    const response = await axios.get(url);
    setManufacture(response.data);
  };

  useEffect(() => {
    getVendor();
    getPurchasing();
    getCustomer();
    getP_stock();
    getProduct();
    getCurrnetStock();
    getManufacture();
  }, []);

  useEffect(() => {
    purchasingSort();
    stockChunked();
    manuToday();
  }, []);
  const colog = () => {
    console.log("vendor", vendor);
    console.log("purchasing", purchasing);
    console.log("customer", customer);
    console.log("p_stock", p_stock);
    console.log("product", product);
    console.log("currentStock", currentStock);
    console.log("chunkedStock", chunkedStock);
    console.log("manufacture", manufacture);
    console.log("manuArray", manuArray);
    console.log("todayManu", todayManu);
  };
  const purchasingSort = () => {
    // 구매일 기준으로 내림차순 정렬
    const sortedPurchasing = [...purchasing].sort((a, b) => {
      const dateA = new Date(a.구매일);
      const dateB = new Date(b.구매일);
      return dateA - dateB;
    });
    // 5개씩 잘라서 저장
    const chunkSize = 5;
    const chunkedArray = [];
    for (let i = 0; i < sortedPurchasing.length; i += chunkSize) {
      chunkedArray.push(sortedPurchasing.slice(i, i + chunkSize));
    }
    setChunkedPurchasing(chunkedArray);
  };
  useEffect(() => {
    purchasingSort();
  }, [purchasing]);

  // 원자재갯수 이름순으로 표시중..
  const sortStock = (stock) => {
    return [...stock].sort((a, b) => {
      if (a.종류 < b.종류) return -1;
      if (a.종류 > b.종류) return 1;
      const dateA = new Date(a.사용기한);
      const dateB = new Date(b.사용기한);
      if (a.종류 === b.종류) {
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
      }
    });
  };

  const stockChunked = () => {
    const sorted = sortStock(currentStock);
    const chunkSize = 5;
    const chunkedArray = [];
    for (let i = 0; i < sorted.length; i += chunkSize) {
      chunkedArray.push(sorted.slice(i, i + chunkSize));
    }
    setChunkedStock(chunkedArray);
  };

  useEffect(() => {
    stockChunked();
  }, [currentStock]);

  // 제품생산: 오늘 날짜에 생산된 제품과 개수
  const manuToday = () => {
    const today = new Date().toISOString().slice(0, 10);
    const manuArray = manufacture.filter((a) => a.생산일 === today);
    const sorted = manuArray.sort((a, b) => b.생산갯수 - a.생산갯수);
    const chunkSize = 5;
    const chunkedArray = [];
    for (let i = 0; i < sorted.length; i += chunkSize) {
      chunkedArray.push(sorted.slice(i, i + chunkSize));
    }
    setTodayManu(chunkedArray);
  };

  useEffect(() => {
    manuToday();
  }, [manufacture]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard_inner} >
      Dashboard
      <button
        onClick={() => {
          colog();
        }}
      >
        테스트용
      </button>
      {chunkedPurchasing.map((chunk, index) => (
        <div key={index}>
          <h2>구매내역 {index + 1}</h2>
          {chunk.map((item, innerIndex) => (
            <p key={innerIndex}>
              <div>구매일 : {item.구매일}</div>
              <div>이름 : {item.이름}</div>
              <div>
                금액 :{" "}
                {item.최종금액
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                원
              </div>
            </p>
          ))}
        </div>
      ))}
      <h2>원자재갯수</h2>
      {chunkedStock.map((chunk, b) => (
        <div key={b}>
          <h2> {b + 1} 페이지</h2>
          {chunk.map((item, innerIndex) => (
            <p key={innerIndex}>
              <div>이름 : {item.종류} </div>
              <div>사용기한 {item.사용기한}</div>
              <div>개수 : {item.개수}</div>
              <div>
                사이즈{" "}
                {item.사이즈
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                g
              </div>
            </p>
          ))}
        </div>
      ))}
      <h2>제품생산</h2>
      {todayManu.map((chunk, b) => (
        <div key={b}>
          <h2> {b + 1}페이지</h2>
          {chunk.map((todayM, index) => (
            <p key={index}>
              <div>생산일 : {todayM.생산일}</div>
              <div>생산갯수 : {todayM.생산갯수}개</div>
            </p>
          ))}
        </div>
      ))}
    </div>
    </div>
  );
};

export default Dashboard;
