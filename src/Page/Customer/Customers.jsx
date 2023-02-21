import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowEditForm(true);

  };

  const handleSave = (updatedCustomer) => {
    axios
      .put(`/api/customer/${updatedCustomer.고객ID}`, updatedCustomer)
      .then((response) => {
        const updatedCustomers = customers.map((c) =>
          c.id === updatedCustomer.고객ID ? updatedCustomer : c
        );
        setCustomers(updatedCustomers);
        setShowEditForm(false);
        setSelectedCustomer(null);
      });
  };

  const handleCancel = () => {
    setShowEditForm(false);
    setSelectedCustomer(null);
  };

  const EditForm = ({ customer, onSave, onCancel }) => {
    const [name, setName] = useState(customer.name);
    const [phone, setPhone] = useState(customer.phone);
    const [comment, setComment] = useState(customer.comment);


    const handleSubmit = (event) => {
      window.location.reload();
      onSave({ ...customer, name, phone,comment });
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name|| ""}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
        />
        <input
          type="text"
          value={phone || ""}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="전화번호"
        />
                <input
          type="text"
          value={comment|| ""}
          onChange={(e) => setComment(e.target.value)}
          placeholder="코멘트"
        />
        <button type="submit">저장</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    );
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
              name="searchQuery"
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
        {showEditForm && selectedCustomer && (
          <div>
          <EditForm
            customer={selectedCustomer}
            onSave={handleSave}
            onCancel={handleCancel}
          /> <hr/></div>
        )}
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
                  <td>{d.코멘트}</td>
                  <td>{d.등록일}</td>
                  <td>
                    <button onClick={() => handleEdit(d)}>수정</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        
              </div>
    );
    

 }

export default Customers;
