import React from 'react'
import AddMaterialsType from '../MaterialPages/AddMaterialsType'
import CurrentMaterialStocks from '../MaterialPages/CurrentMaterialStocks'
import PurchaseMaterial from '../MaterialPages/PurchaseMaterial'
import PurchaseMaterialsHistory from '../MaterialPages/PurchaseMaterialsHistory'

const MaterialIndexPage = () => {
  return (
    <div>
      <AddMaterialsType></AddMaterialsType>
      <PurchaseMaterial></PurchaseMaterial>
      <PurchaseMaterialsHistory></PurchaseMaterialsHistory>
      <CurrentMaterialStocks></CurrentMaterialStocks>
    </div>
  )
}

export default MaterialIndexPage
