import { useEffect, useState } from "react";
import axios from "axios";

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
    const url = "/api/CurrentStock";
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
  useEffect(() => {
    // 구매일 기준으로 내림차순 정렬
    const sortedPurchasing = [...purchasing].sort((a, b) => {
      const dateA = new Date(a.구매일);
      const dateB = new Date(b.구매일);
      return dateB - dateA;
    });

    // 5개씩 잘라서 저장
    const chunkSize = 5;
    const chunkedArray = [];
    for (let i = 0; i < sortedPurchasing.length; i += chunkSize) {
      chunkedArray.push(sortedPurchasing.slice(i, i + chunkSize));
    }
    setChunkedPurchasing(chunkedArray);
  }, [purchasing]);

  // 사용기한 기준으로 내림차순
  useEffect(() => {
    const sorted = [...currentStock].sort((a, b) => {
      const dateA = new Date(a.사용기한);
      const dateB = new Date(b.사용기한);
      return dateA - dateB;
    });

    const chunkSize = 5;
    const chunkedArray = [];
    for (let i = 0; i < sorted.length; i += chunkSize) {
      chunkedArray.push(sorted.slice(i, i + chunkSize));
    }
    setChunkedStock(chunkedArray);
  }, [currentStock]);

  // 오늘 생산된 제품
  // const todayManufacture = () => {
  //   const today = new Date().toISOString().slice(0, 10);
  //   manufacture.forEach((a) => {
  //     if (a.생산일 == today) {
  //       manuArray.push(a);
  //     }
  //   });
  //   const sorted = [...manuArray].sort((b, c) => {
  //     const amountA = b.생산갯수;
  //     const amountB = c.생산갯수;
  //     return amountB - amountA;
  //   });
  //   setTodayManu(sorted);
  // };
  // useEffect(() => {
  //   todayManufacture();
  // }, [manufacture]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const manuArray = manufacture.filter((a) => a.생산일 === today);
    const sorted = manuArray.sort((a, b) => b.생산갯수 - a.생산갯수);
    setTodayManu(sorted);
  }, [manufacture]);
  return (
    <div>
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
              {item.구매일} , {item.구매ID}
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
              {item.종류} {item.사용기한} {item.사이즈}g
            </p>
          ))}
        </div>
      ))}
      <h2>생산</h2>
      {todayManu.map((todayM, index) => (
        <div key={index}>
          <p>
            생산ID:{todayM.생산ID} {todayM.생산일} {todayM.생산갯수}개
          </p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
