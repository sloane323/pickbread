import axios from "axios";
import { useEffect, useState } from "react";
import AddCustomer from "./AddCustomer";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const totalPages = Math.ceil(customers.length / resultsPerPage);

  const [searchQuery, setSearchQuery] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handlePaginationClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const getCustomers = async () => {
    const response = await axios.get(`/api/customer?page=${currentPage}&resultsPerPage=10`);
    setCustomers(response.data);
  };
  

  
  useEffect(() => {
    getCustomers();
  }, [currentPage]);
  

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
  
  const handleDelete = (id) => {
    axios.delete(`/api/customer`, { data: { id } }).then((response) => {
      const updatedCustomers = customers.filter((c) => c.고객ID !== id);
      setCustomers(updatedCustomers);
    });
  };
  const EditForm = ({ customer, onSave, onCancel }) => {
    const [name, setName] = useState(customer.이름);
    const [phone, setPhone] = useState(customer.전화번호);
    const [comment, setComment] = useState(customer.코멘트);

    const handleSubmit = (event) => {
      window.location.reload();
      onSave({ ...customer, name, phone,comment });
    };

    useEffect(() => {
      const fetchCustomers = async () => {
        const response = await axios.get(`/api/customer?page=${currentPage}&resultsPerPage=
        ${resultsPerPage}`);
        setCustomers(response.data);
      };
  
      fetchCustomers();
    }, [currentPage, resultsPerPage]);
  
    const startIndex = currentPage * resultsPerPage;


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
        <AddCustomer />
        </div>
        <div>
          <h3>고객검색</h3>
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
              <th>V</th>
              <th>no</th>
              <th>고객명</th>
              <th>전화번호</th>
              <th>코멘트</th>
              <th>시간</th>
              <th>설정</th>
            </tr>
          </thead>
          <tbody>
            {customers &&
              customers.map((customer, idx) => (
                <tr key={idx}>
                  <td> <input type="checkbox"></input></td>
                  <td>{idx + 1}</td>
                  <td>{customer.이름}</td>
                  <td>{customer.전화번호}</td>
                  <td>{customer.코멘트}</td>
                  <td>{customer.등록일}</td>
                  <td>
                  <button onClick={() => handleDelete(customer.고객ID)}>삭제</button> 
                    <button onClick={() => handleEdit(customer)}>수정</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index} onClick={() => handlePaginationClick(index + 1)}>
            {index + 1}
          </button>
        ))}
        </div>
              </div>
    );
    

 }

export default Customers;