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

  const [currentStock, setCunrrentStock] = useState();
  const [chunkedStock, setChunkedStock] = useState([]);
  const [dispStock, setDisplayStock] = useState([]);
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

  useEffect(() => {
    getVendor();
    getPurchasing();
    getCustomer();
    getP_stock();
    getProduct();
    getCurrnetStock();
  }, []);

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
  const displayStock = () => {
    const sortedStock = currentStock.map((stock) => {
      return [...stock].sort((a, b) => {
        const dateA = new Date(a.사용기한);
        const dateB = new Date(b.사용기한);
        return dateA - dateB;
      });
    });
  };
  const colog = () => {
    console.log("vendor", vendor);
    console.log("purchasing", purchasing);
    console.log("customer", customer);
    console.log("p_stock", p_stock);
    console.log("product", product);
    console.log("currentStock", currentStock);
  };

  return (
    <div>
      Dashboard
      <button
        onClick={() => {
          colog();
          displayStock();
        }}
      >
        테스트용
      </button>
      {chunkedPurchasing.map((chunk, index) => (
        <div key={index}>
          <h2>구매내역 {index + 1}</h2>
          {chunk.map((item, innerIndex) => (
            <p key={innerIndex}>{item.구매일}</p>
          ))}
        </div>
      ))}
      <h2>원자재갯수</h2>
      {currentStock !== undefined &&
        currentStock.map((a) => (
          <div>
            <p>
              {a.종류} {a.사용기한}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
