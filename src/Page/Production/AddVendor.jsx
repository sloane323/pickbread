// 벤더(거래처) 등록 페이지 (진행중)

import { useState } from "react";

const AddVendor = () => {

    const [input, setInput] = useState("");
    
    const handleChange =(e)=>{
        setInput(e.target.value);
    }

    return ( 
        <div>
            <h1>거래처 등록 페이지</h1>
            <div>
                vendor ID :
                <br />
                이름 <input type="text" onChange/>
                <br />
                전화번호 <input type="text" />
                <br />
                담당자 <input type="text" />
                <br />
                코멘트/할인율 <input type="text" />
            </div>
            
        </div>
    );
}

export default AddVendor;