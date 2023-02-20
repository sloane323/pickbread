
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const CustomerList = (props) => {
    const { open, close } = props;

    const [customers, setCustomers] = useState("");
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
      connection.query(`SELECT * FROM 고객 WHERE 이름 LIKE '%${searchQuery}%' OR 전화번호 LIKE '%${searchQuery}%'`, (error, results, fields) => {
        if (error) {
          console.error('Error retrieving customers: ', error);
          return;
        }
        setCustomers(results);
      });
    }, [searchQuery]);

    const handleSearch = (event) => {
      event.preventDefault();
      // Reset the customer list if the search query is empty
      if (searchQuery.trim() === '') {
        setCustomers([]);
        return;
      }
      setSearchQuery(event.target.search.value);
    };
  

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
        <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search by username or email" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.username} - {customer.email}
          </li>
        ))}
      </ul>
        <div> 
        <table>

        <tbody>
          {customers &&
            customers.map((d, idx) => (
              <div>
                <button key={idx}>
                <td>{idx + 1}</td>
                <td>이름:{d.이름}</td>
                <td>#:{d.전화번호}</td>
                </button>
              </div>
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