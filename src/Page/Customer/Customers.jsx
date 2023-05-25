import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddCustomer from "./AddCustomer";
import styles from "./Customer.module.css";
import { ReactComponent as Dele } from "./SVG/Dele.svg";
import { ReactComponent as Pen } from "./SVG/Pen.svg";
import { ReactComponent as Add } from "./SVG/Add.svg";

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
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDiv = () => {
    setIsExpanded(!isExpanded);
  };
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
      alert("삭제 완료");
      window.location.reload(); 
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
    <div className={styles.venderclass} >   

     
      <button onClick={toggleDiv}>  + 신규 고객 등록</button>
   
      <br />
      {isExpanded && (
      <div className={styles.addcustomerdiv}>
        <div className={styles.innerdiv}>
                 <h3> 고객등록 </h3>
          <AddCustomer />
        </div>    </div> 
      )}


      <div>
      <div className={styles.searchtable}>
      <div >

        <div className={styles.formsearch}>
        <form onSubmit={handleSearch} >
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
      <table className={styles.table}>
       
        <thead>
          <tr className={styles.theada}>
            <th>   </th>
            <th className={styles.c1}><b>No.</b></th>
            <th className={styles.c2}><b>고객명</b></th>
            <th className={styles.c3}><b>전화번호</b></th>
            <th className={styles.c4}><b>코멘트</b></th>
            <th className={styles.c5}><b>시간</b></th>
            <th className={styles.c6}><b>포인트</b></th>
            <th className={styles.c7}> <b>설정</b></th>
          </tr>
        </thead>
        <tbody>
        <tr>
      <td colSpan="8" className={styles.separator}></td>
        </tr>
        <tr>
        <td className={styles.separator2} />
        </tr>

          {customers &&
            customers.map((customer, idx) => (
              <tr key={idx}  >
                <td >
                  <input
                    type="checkbox"
                    key={customer.고객ID}
                    checked={selectedCustomers.includes(customer)}
                    onChange={(e) => handleCheckboxChange(e, customer)}
                  />{" "}
                </td>
                <td>{(currentPage - 1) * 5 + idx + 1}</td>
                <td>{customer.이름}</td>
                <td>{customer.전화번호}</td>
                <td>{customer.코멘트}</td>
                <td>{new Date(customer.등록일).toLocaleString().slice(2, -3)}</td>
                <td>
                  {customer.포인트}
                  <Link to={`/customers/point/${customer.고객ID}`}>
                    <Add className={styles.adds} />
                  </Link>
                </td>
                <td>
                  <div className={styles.iconebox}>
                  <div onClick={() => handleDelete(customer.고객ID)}>
                    <Dele className={styles.dele} />
                  </div>
                  <div onClick={() => handleEdit(customer)}>
                  <Pen className={styles.dele} />
                  </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    
      <div className={styles.back}>
    
        {customers &&
          Array(+customers[0].페이지수)
            .fill()
            .map((el, idx) => {
              return (
             
                <div key={idx + 1} 
                onClick={handlePaginationClick} 
                className={styles.spans}>
                  {idx + 1}
                </div>
             
              );
            })}
              
      </div>
  
      </div>
    </div>
    </div>
  );
};

export default Customers;
