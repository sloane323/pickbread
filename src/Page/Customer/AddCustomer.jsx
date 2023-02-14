import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const AddCustomer = () => {
   const navigator = useNavigate();
    // 입력받을 state
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
  
  
      // 거래처 등록 함수
      const post = () => {
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
        const res = await post();
        setName(""); setPhone("");  setComment(""); 
        alert("고객등록 완료"); 
        navigator(-1);
         }
        catch (e) {
            alert("고객등록 실패");
        }
    };


    return ( 
        <div>
                    <div> <h1>Customers </h1></div>
                    <button> <Link to = '/customers'> 뒤로 </Link> </button>
                
                <div>
                    <form  onSubmit={onSubmit} > 

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

                    <button> 등록 </button>

                    </form>
                </div>
        </div>
     );
}
 
export default AddCustomer;