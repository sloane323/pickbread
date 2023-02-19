import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Customers = () => {
  // 고객 조회 화면 출력을 위한 state
  const [customers, setCustomers] = useState("");
  // 고객 조회 함수
  const getCustomer = () => {
    axios.get("/api/customer").then((res) => setCustomers(res.data));
  };
  // 렌더되면 바로 조회
  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <div>
      <div>
        <h1>Customers 목록</h1>
      </div>
      <div>
        <button>
          <Link to="/customers/add">고객 등록하러 가기</Link>
        </button>
      </div>
      <div>
        <input type="text" />
        <button> 검색 </button>
      </div>
      <div></div>
      <h2>조회</h2>
      <table>
        <thead>
          <tr>
            <th>no</th>
            <th>고객이름</th>
            <th>전화번호</th>
            <th>포인트</th>
            <th>코멘트</th>
            <th>설정</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((d, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{d.이름}</td>
                <td>{d.전화번호}</td>
                <td>{d.포인트}</td>
                <td>{d.코멘트}</td>
                <td><button>X</button></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
