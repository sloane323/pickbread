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

      const [lastIdx, setLastIdx] = useState(0)

      useEffect(async() => {
        try{
            const res = await axios.get('/api/customer')
            const _inputData = await res.data.map((rowData) => ({
                customerid: rowData.id,
                name: rowData.name,
                phone: rowData.phone,
                comment: rowData.comment
              })
            )
              setInputData(inputData.concat(_inputData))
        } catch(e){
            console.error(e.message)} 
        } ,[])


    return ( <div>
        <div> <h1>Customers </h1></div>

    <div> 
    <button> <Link to = '/customers/add'> 고객등록 </Link> </button>
    </div>
    <div> <input type="text" />  
     <button>  검색 </button></div>


        <table> 
                <tr>
                <td> no. </td>
                    <td> 고객이름 </td>
                    <td>  전화번호 </td>
                    <td>  사용가능 포인트 </td>
                    <td>  기타내용 </td>
                </tr>

                <tr>
                    <td> 1 </td>
                    <td> 호올리 </td>
                    <td>  010-7416-1811 </td>
                    <td>  500 </td>
                    <td>  VIP </td>
                </tr>

                <tr>
                    <td> 1 </td>
                    <td> {rowData.name} </td>
                    <td> {rowData.phone}</td>
                    <td>  {rowData.comment} </td>
                    <td>  {rowData.id} </td>
                </tr>
                
            </table>


    </div> );
}

export default Customers;