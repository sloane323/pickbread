import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/* 로직
1) 페이지가 처음 렌더될 때 원자재구매 테이블 전체를 가져오고 state에 넣기
2) state의 내용을 컴포넌트 내에서 반복하기
3) input에 검색어를 입력하고, 버튼을 누르면 해당 검색어를 통해 api, 원자재구매 테이블에 접근
setter를 통해 purchases 내용을 바꿔주기 */

const GetPurchaseMaterialsHistory = () => {
  const [purchases, setPurchases] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const getPurchase = async () => {
    const url = "/api/purchasing";
    const response = await axios.get(url);
    setPurchases(response.data);
  };
  useEffect(() => {
    getPurchase();
  }, []);
  const searchPurchase = async () => {
    const url = `/api/purchasing/${searchQuery}`
    const response = await axios.get(url);
    setPurchases(response.data);
  }
  return (
    <div>
      <h1>원자재 구매내역 조회</h1>
      <div>
        <input type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
        <button onClick={searchPurchase}>검색</button>
        <button onClick={getPurchase}>초기화</button>
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
