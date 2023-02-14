import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const AddCustomer = () => {
  const navigator = useNavigate();
  // 입력받을 state
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const addCustomer = () => {
    const url = "/api/customer";
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("comment", comment);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    return axios.post(url, formData, config);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addCustomer();
      setName("");
      setPhone("");
      setComment("");
      alert("구매등록 완료");
      navigator(-1);
    } catch (e) {
      alert("구매등록 실패");
    }
  };

  return (
    <div>
      <div>
        <h1>Customers </h1>
      </div>
      <button>
        <Link to="/customers"> 뒤로 </Link>
      </button>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label>
              이름
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          </div>

          <div>
            <label>
              전화번호
              <input
                type="text"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </label>
          </div>

          <div>
            <label>
              코멘트
              <input
                type="text"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </label>
          </div>

          <button> 등록 </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
