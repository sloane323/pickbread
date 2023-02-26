import React from 'react'
import GetCurrentMaterialStocks from "../../../components/GetStocks/GetCurrentMaterialStocks"
import GetCurrentProductStocks from "../../../components/GetStocks/GetCurrentProductStocks"

const TotalStocksIndexPage = () => {
  return (
    <div>
      <GetCurrentMaterialStocks></GetCurrentMaterialStocks>
      <GetCurrentProductStocks></GetCurrentProductStocks>
    </div>
  )
}

export default TotalStocksIndexPage
