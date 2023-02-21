import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const CustomerList = (props) => {
  const { open, close } = props;

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
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
              <div>
                <button>
                  <Link to="/customers/add">고객 등록하러 가기</Link>
                </button>
              </div>
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
              <div>
                <table>
                  <tbody>
                    {customers &&
                      customers.map((d, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>이름: {d.이름}</td>
                          <td>#:{d.전화번호}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </header>
            <button className="close" onClick={close}>
              X
            </button>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default CustomerList;
