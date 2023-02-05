const SelectList = (props) => {
    
    return ( 
        <>
        {
            props.selectedProduct.map((idx)=>{
                return(
                    <tr>
                        <td key={idx[0]}></td>
                        <td>{idx[1]}</td>
                        <td>{idx[2]}</td>
                        <td>{idx[3]}</td>
                        {/* <td>{props.selectedProduct.</td> */}
                    </tr>
                )
            })
        }
        </>
     );
}
 
export default SelectList ;