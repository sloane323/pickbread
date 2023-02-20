
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const CustomerList = (props) => {
    const { open, close } = props;
    const [customers, setCustomers] = useState("");

    const getCustomer = () => {
    axios.get("/api/customer").then((res) => setCustomers(res.data));
  };
  // 렌더되면 바로 조회
  useEffect(() => {
    getCustomer();
  }, []);

    return ( <div> 
<div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            <div> 
          <button>
          <Link to="/customers/add">고객 등록하러 가기</Link>
        </button>
        </div> 
        
        <div> 
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
                <td>0</td>
                <td>{d.코멘트}</td>
                <td>.</td>
              </tr>
            ))}
        </tbody>
      </table>

        </div></header>
           <button className="close" onClick={close}>
              X 
            </button>
        </section>
      ) : null}
    </div>
    </div> );
}
 
export default CustomerList;