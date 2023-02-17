import { useEffect, useState } from "react";
import axios from "axios";
const Dashboard = () => {
  const [vendor, setVendor] = useState();
  const [purchasing, setPurchasing] = useState();
  const [customer, setCustomer] = useState();
  const [p_stock, setP_stock] = useState();
  const [product, setProduct] = useState();
  const [today, setToday] = useState(new Date().toISOString().slice(0, 10));

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

  useEffect(() => {
    getVendor();
    getPurchasing();
    getCustomer();
    getP_stock();
    getProduct();
  }, []);

  // 날짜 비교하는 함수
  const dateDiff = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    const diffDate = date1.getTime() - date2.getTime();
    return Math.abs(diffDate / (1000 * 60 * 60 * 24));
  };

  // 원자재 구매 날짜 비교
  const purchasingDate = () => {
    // for (let i = 0; i < purchasing.length; i++) {
    //   const PDate = purchasing[i].구매일;
    //   console.log(dateDiff(today, PDate));
    // }
    // 정렬하는함수
    purchasing.sort(function (a, b) {
      if (a > b) return 1;
      if (a === b) return 0;
      if (a < b) return -1;
    });
  };

  const colog = () => {
    console.log("vendor", vendor);
    console.log("purchasing", purchasing);
    console.log("customer", customer);
    console.log("p_stock", p_stock);
    console.log("product", product);
    console.log("today", today);
  };
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
      <button
        onClick={() => {
          purchasingDate();
        }}
      >
        구매날짜
      </button>
    </div>
  );
};

export default Dashboard;
