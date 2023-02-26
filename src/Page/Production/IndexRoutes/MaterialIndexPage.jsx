import React from "react";
import AddMaterialsType from "../MaterialPages/AddMaterialsType";
import PurchaseMaterial from "../MaterialPages/PurchaseMaterial";
import PurchaseMaterialsHistory from "../MaterialPages/PurchaseMaterialsHistory";
import CurrentMaterialStocks from "../MaterialPages/CurrentMaterialStocks";

const MaterialIndexPage = () => {
  return (
    <div>
      <AddMaterialsType></AddMaterialsType>
      <PurchaseMaterial></PurchaseMaterial>
      <PurchaseMaterialsHistory></PurchaseMaterialsHistory>
      <CurrentMaterialStocks></CurrentMaterialStocks>
    </div>
  );
};

export default MaterialIndexPage;
