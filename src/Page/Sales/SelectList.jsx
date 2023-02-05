const SelectList = (props) => {
    console.log(props.selectedProduct);
    return ( 
        <>
        {
            props.selectedProduct.map(()=>{
                return(
                    <tr>
                        <td key={props.selectedProduct.제품ID}></td>
                        <td>{props.selectedProduct.이름}</td>
                        <td>{props.selectedProduct.갯수}</td>
                        <td>{props.selectedProduct.개당가격}</td>
                        {/* <td>{props.selectedProduct.</td> */}
                    </tr>
                )
            })
        }
        
        </>
     );
}
 
export default SelectList ;