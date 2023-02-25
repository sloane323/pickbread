import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const GetPurchaseMaterialsHistory = () => {
  const [purchases, setPurchases] = useState();
  const getPurchase = async () => {
    const url = "/api/purchasing";
    const response = await axios.get(url);
    setPurchases(response.data);
  };
  useEffect(() => {
    getPurchase();
  }, []);
  return (
    <div>
      <h1>원자재 구매내역 조회</h1>
      <div>
        <input type="text" />
        <button> 검색 </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>no</th>
            <th>구매일</th>
            <th>할인 전 금액</th>
            <th>할인율</th>
            <th>최종 금액</th>
            <th>거래처</th>
          </tr>
        </thead>
        <tbody>
          {purchases &&
            purchases.map((purchase, idx) => (
              <tr key={purchase.구매ID}>
                <td>{idx + 1}</td>
                <td>{purchase.구매일}</td>
                <td>{purchase.할인전금액}</td>
                <td>{purchase.할인율}%</td>
                <td>{purchase.최종금액}</td>
                <td>{purchase.이름}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetPurchaseMaterialsHistory;
