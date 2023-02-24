import React from 'react'
import AddMaterial from './AddMaterial'
import AddPurchase from './AddPurchase'
import Purchase from './Purchase'
import Stock from './Stock'

const MaterialPage = () => {
  return (
    <div>
      <AddMaterial></AddMaterial>
      <AddPurchase></AddPurchase>
      <Purchase></Purchase>
      <Stock></Stock>
    </div>
  )
}

export default MaterialPage
