import React from 'react'

const MaterialStockOption = (props) => {
  return (
    <option id={props?.materialStock.재고ID}>
      {props?.materialStock.종류}
    </option>
  )
}

export default MaterialStockOption
