import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddCustomer from "./AddCustomer";

const Customers = (props) => {
  const [customers, setCustomers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [isCustomerSelectionEnabled, setIsCustomerSelectionEnabled] =
    useState(false);
  const [selectedCustomerData, setSelectedCustomerData] = useState(null);

  /* props에서 받아온 useState */
  const { customerTest, setCustomerTest } = props;

  const handlePaginationClick = (e) => {
    setCurrentPage(e.target.textContent);
  };
  const getCustomers = async () => {
    const response = await axios.get(`/api/customer?page=${currentPage}`);
    setCustomers(response.data);
  };

  const handleCheckboxChange = (event, customer) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedCustomerData(customer);
      setSelectedCustomers([...selectedCustomers, customer]);
      setCustomerTest([customer]);
      console.log(customer);
    } else {
      const filteredCustomers = selectedCustomers.filter(
        (c) => c.고객ID !== customer.고객ID
      );
      setSelectedCustomers(
        filteredCustomers.length > 0 ? filteredCustomers : []
      );

      setCustomerTest([]);
    }
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

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowEditForm(true);
  };

  const handleSave = (updatedCustomer) => {
    axios
      .put(`/api/customer/${updatedCustomer.고객ID}`, updatedCustomer)
      .then((response) => {
        axios
          .post(`/api/point/${updatedCustomer.고객ID}`, updatedCustomer, {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            getCustomers();
            setShowEditForm(false);
            setSelectedCustomer(null);
          });
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
    const [point, setPoint] = useState(customer.포인트 || 0);
    const [pointDelta, setPointDelta] = useState(0);
    useEffect(() => {
      setPointDelta(Number(point) - Number(customer.포인트));
    }, [point, customer]);
    useEffect(() => {
      setPoint(Number(pointDelta) + Number(customer.포인트));
    }, [pointDelta, customer]);

    const handleSubmit = (event) => {
      event.preventDefault();
      onSave({ ...customer, name, phone, comment, point });
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
          <label>이름</label>
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            value={phone || ""}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label>전화번호</label>
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            value={comment || ""}
            onChange={(e) => setComment(e.target.value)}
          />
          <label>코멘트</label>
        </div>
        <div className="input-wrapper">
          <input
            type="number"
            value={point}
            onChange={(e) => setPoint(e.target.value)}
            min={0}
            step={100}
          />
          <label htmlFor="point">포인트</label>
        </div>
        <div className="input-wrapper">
          <input
            type="number"
            value={pointDelta}
            onChange={(e) => setPointDelta(e.target.value)}
            min={-customer.포인트}
            step={100}
          />
          <label htmlFor="point">포인트 변화</label>
        </div>

        <button type="submit">저장</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    );
  };
  return (
    <div>
      <h3> 고객등록 </h3>
      <AddCustomer />
      <div></div>
      <h3>고객 조회</h3>
      <div>
        <form onSubmit={handleSearch}>
          <div className="input-wrapper">
            <input
              type="text"
              name="searchQuery"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              required
            />
            <label>이름 & 전화번호</label>
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
      <br />
      {showEditForm && selectedCustomer && (
        <div>
          <EditForm
            customer={selectedCustomer}
            onSave={handleSave}
            onCancel={handleCancel}
          />{" "}
          <hr />
        </div>
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
            <th>포인트</th>
            <th>설정</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customer, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    type="checkbox"
                    key={customer.고객ID}
                    checked={selectedCustomers.includes(customer)}
                    onChange={(e) => handleCheckboxChange(e, customer)}
                  />{" "}
                </td>
                <td>{(currentPage - 1) * 10 + idx + 1}</td>
                <td>{customer.이름}</td>
                <td>{customer.전화번호}</td>
                <td>{customer.코멘트}</td>
                <td>{customer.등록일}</td>
                <td>
                  {customer.포인트}
                  <Link to={`/customers/point/${customer.고객ID}`}>
                    내역 조회
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(customer.고객ID)}>
                    삭제
                  </button>
                  <button onClick={() => handleEdit(customer)}>수정</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {customers &&
          Array(+customers[0].페이지수)
            .fill()
            .map((el, idx) => {
              return (
                <button key={idx + 1} onClick={handlePaginationClick}>
                  {idx + 1}
                </button>
              );
            })}
      </div>
    </div>
  );
};

export default Customers;
