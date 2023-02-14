import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Customers = () => {

    const [inputData, setInputData] = useState([{
        customerid: '',
        name: '',
        phone: '',
        comment: ''
      }])





const Customers = () => {

  // 고객 조회 화면 출력을 위한 state
const [customers, setCustomers] = useState("");
  // 고객 조회 함수
const getCustomer =()=> {
  axios.get('/api/customer')
  .then(res => setCustomers(res.data))
}
  // 렌더되면 바로 조회
useEffect(()=>{
  getCustomer();
},[]);


                {/* <tr>
                    <td> 1 </td>
                    <td> {rowData.name} </td>
                    <td> {rowData.phone}</td>
                    <td>  {rowData.comment} </td>
                    <td>  {rowData.id} </td>
                </tr> */}
                
            </table>

      </div>
      <h2>조회</h2>
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
                    {
                        customers && customers.map((d, idx)=>(
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{d.이름}</td>
                            <td>{d.전화번호}</td>
                            <td>0</td>
                            <td>{d.코멘트}</td>
                            <td>.</td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>

  );
};

export default Customers;
