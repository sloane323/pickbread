import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Customers = () => {

  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getCustomers = () => {
    axios.get("/api/customer").then((response) => {
      setCustomers(response.data);
    });
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    axios.get(`/api/customer?search=${searchQuery}`).then((response) => {
      setCustomers(response.data);
    });
  };

  const handleReset = () => {
    setSearchQuery("");
    getCustomers();
  };

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
      <form onSubmit={handleSearch}>
              <input
                 type="text"
                 name="searchQuery" // change name to searchQuery
                 value={searchQuery}
                 placeholder="이름 & 전화번호"
                 onChange={(event) => setSearchQuery(event.target.value)}
                 />
                <button type="submit">Search</button>
                <button type="button" onClick={handleReset}>
                  Reset
                </button>
              </form>
      </div>
      <div></div>
      <h2>조회</h2>
      <table>
        <thead>
          <tr>
            <th>no</th>
            <th>고객명</th>
            <th>전화번호</th>
            <th>포인트</th>
            <th>기타</th>
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
                <td>.</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
