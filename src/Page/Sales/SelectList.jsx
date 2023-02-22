import { useEffect, useState } from "react";

const SelectList = (props) => {

    
    return ( 
        <>
        {
            props.selectedProduct.map((idx,index)=>{
                return(
                    <tr key={idx[0]}>
                        <td>{index+1}</td>
                        <td>{idx[1]}</td>
                        <td>{idx[2]}</td>
                        <td>{idx[3]}</td>
                        <td>{idx[3]*idx[2]}</td>
                    </tr>
                );
            })
        }
        </>
     );
}
 
export default SelectList ;