const SelectList = (props) => {
    return ( 
        <>
        {
            props.map(()=>{
                return(
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                )
            })
        }
        
        </>
     );
}
 
export default SelectList ;