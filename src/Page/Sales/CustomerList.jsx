
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const CustomerList = (props) => {
    const { open, close } = props;

    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const getCustomers = () => {
      axios.get('/api/customer').then((response) => {
        setCustomers(response.data);
      });
    };
  
    useEffect(() => {
      getCustomers();
    }, []);
    
  
    const handleSearch = (event) => {
      
      event.preventDefault();
      // Reset the customer list if the search query is empty
      if (searchQuery.trim() === '') {
        getCustomers();
        return;
      }
      axios.get(`/api/customer?search=${searchQuery}`).then((response) => {
        setCustomers(response.data);
      });
    };



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
        <input type="text" name="search" placeholder="이름 & 전화번호" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {customers.map((customer) => (
          <li key={customer.이름}>
            {customer.이름} - {customer.번호}
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