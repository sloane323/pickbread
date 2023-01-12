import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const AddCustomer = () => {
    const customerId = Math.random().toString(36).substring(2, 11);
  
    // 입력받을 state
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
  
  
      // 거래처 등록 함수
      const post = () => {
        const url = "/api/customer";
        const formData = new FormData();
        formData.append("id", customerId);
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
        const res = await post();
        setName(""); setPhone("");  setComment("");
    };


    return ( 
        <div>
                    <div> <h1>Customers </h1></div>
                    <button> <Link to = '/customers'> 뒤로 </Link> </button>


                <div>
                    <div>
                        <lable> 고객 ID </lable>
                        {customerId}
                    </div> 

                    <div>
                        <lable> 이름 </lable>
                        <input tpye="input" onChange={(e)=>{
                    setName(e.target.value)}}  ></input>
                    </div> 

                    <div>
                        <lable> 전화번호 </lable>
                        <input tpye="input" onChange={(e)=>{
                    setPhone(e.target.value)}} ></input>
                    </div> 

                    <div>
                        <lable> 코멘트 </lable>
                        <input tpye="input" onChange={(e)=>{
                    setComment(e.target.value)}} ></input>
                    </div> 

                    <button onClick={onSubmit}> 등록 </button>
                </div>
        </div>
     );
}
 
export default AddCustomer;