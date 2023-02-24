import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const AddCustomer = () => {
  const customerId =Math.random().toString(32).slice(2);
  const date = new Date();
  const createtime = date.toLocaleString();
  const navigator = useNavigate();
  // 입력받을 state
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");



  const post = () => {
    const url = "/api/customer";
    const formData = new FormData();
    formData.append("customerId", customerId);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("comment", comment);
    formData.append("time", new Date().toISOString().slice(0, 19).replace("T", " "));

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    return axios.post(url, formData, config);
  };
  const getPoint = () => {
    const url = "/api/point";
    const formData = new FormData();
    formData.append("customerId", customerId);
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
      window.location.reload();
      alert("고객등록 완료");
      
    } catch (e) {
      alert("구매등록 실패");
    }
  };
  console.log(createtime)
  return (
    <div>
      <div>
        <h3> 고객등록 </h3>
      </div>

      <div>

        <div class="input-wrapper">
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
                <label for="name">이름</label>
        </div>

        <div class="input-wrapper">
              <input
                type="text"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                required/>
              <label for="phone">전화번호</label>
        </div>

        <div class="input-wrapper">
              <input
                type="text"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                required
              />
              <label for="comment">코멘트</label>
        </div>
         
          <button onClick={onSubmit}> 등록 </button>

      </div>
      </div>
  );
};

export default AddCustomer;
