
const Customers = () => {

    return ( <div>
        <div> <h1>Customers </h1></div>

    <div> 
    <button> 고객등록 </button>
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
            </table>


    </div> );
}

export default Customers;