// 벤더(거래처) 등록 페이지 (진행중)
import axios from "axios";
import { useState } from "react";

const AddVendor = () => {

     // 입력받을 state
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [officer, setOfficer] = useState("");
    const [comment, setComment] = useState("");

    const post = () => {
        const url = "/api/vendor";
        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("officer", officer);
        formData.append("comment", comment);
    // const data = {
    //     "name" : "홍길동"
    // }

        const config = {
            headers: { "Content-Type": "application/json" },
        };
        return axios.post(url, formData, config);
        };
        const onSubmit = async (e) => {
        e.preventDefault();
        const res = await post();
    };


    return ( 
        <div>
            <h1>거래처 등록 페이지</h1>
            <form onSubmit={onSubmit}>
                {/* vendor ID 제외 */}
                이름 <input type="text" onChange={(e)=>{
                    setName(e.target.value)}} />
                <br />
                전화번호 <input type="text" onChange={(e)=>{
                    setPhone(e.target.value)}} />
                <br />
                담당자 <input type="text" onChange={(e)=>{
                    setOfficer(e.target.value)}} />
                <br />
                코멘트/할인율 <input type="text" onChange={(e)=>{
                    setComment(e.target.value)}}/>
                <button>제출</button>
            </form>
        </div>
    );
}

export default AddVendor;