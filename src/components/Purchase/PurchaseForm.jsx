import { useEffect, useState } from "react";
import axios from "axios";
import VendorOption from "./VendorOption";
import MaterialOption from "./MaterialOption";
import PurchasingMaterials from "./PurchasingMaterials";
import { useNavigate } from "react-router";

const PurchaseForm = () => {
  const purchasingID = Math.random().toString(32).slice(2);
  const navigate = useNavigate();
  const [vendors, setVendors] = useState("");
  const [materials, setMaterials] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [purchasingMaterials, setPurchaingMaterials] = useState([]);
  const [expDate, setExpDate] = useState(new Date().toISOString().slice(0, 10));
  const [discount, setDiscount] = useState(0);
  const [receipt, setReceipt] = useState("");
  const prevCost = purchasingMaterials
    ? purchasingMaterials.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.cost * currentValue.amount;
      }, 0)
    : 0;
  const totalCost = Math.ceil(prevCost - prevCost * discount * 0.01);
  const getVendor = async () => {
    const url = "/api/vendor";
    const response = await axios.get(url);
    setVendors(response.data);
  };
  const getMaterials = async () => {
    const url = "/api/material";
    const response = await axios.get(url);
    setMaterials(response.data);
  };
  useEffect(() => {
    getVendor();
    getMaterials();
  }, []);
  useEffect(() => {
    if (!selectedVendor && vendors && vendors.length !== 0) {
      setSelectedVendor(vendors[0]);
    }
    if (!selectedMaterial && materials && materials.length !== 0) {
      setSelectedMaterial(materials[0]);
    }
  }, [vendors, materials]);

  const changePurchaseDateHandler = (e) => {
    setPurchaseDate(e.target.value);
  };
  const selectVendorHandler = (e) => {
    const idx = e.target.options.selectedIndex;
    setSelectedVendor(vendors[idx]);
  };
  const selectMaterialHandler = (e) => {
    const idx = e.target.options.selectedIndex;
    setSelectedMaterial(materials[idx]);
  };
  const changeAmountHandler = (e) => {
    setEnteredAmount(e.target.value);
  };
  const changeExpDateHandler = (e) => {
    setExpDate(e.target.value);
  };
  const changeReceiptHandler = (e) => {
    setReceipt(e.target.files[0]);
  };
  const changeDiscountHandler = (e) => {
    setDiscount(e.target.value);
  };
  const addPurchasingMaterialHandler = () => {
    const addedMaterial = {
      materialID: selectedMaterial.?????????ID,
      name: selectedMaterial.??????,
      size: selectedMaterial.?????????,
      cost: selectedMaterial.????????????,
      unit: selectedMaterial.??????,
      amount: enteredAmount,
      expDate: expDate,
    };
    setPurchaingMaterials((prev) => {
      return [...prev, addedMaterial];
    });
    setEnteredAmount(1);
  };
  const purchaseMaterial = () => {
    const url = "/api/purchasing";
    const formData = new FormData();
    formData.append("purchasingID", purchasingID);
    formData.append("vendorID", selectedVendor.??????ID);
    formData.append("purchaseDate", purchaseDate);
    formData.append("prevCost", prevCost);
    formData.append("discount", discount);
    formData.append("totalCost", totalCost);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    return axios.post(url, formData, config);
  };
  const addMStock = (idx) => {
    const url = "/api/m_stock";
    const stockID = Math.random().toString(32).slice(2);
    const formData = new FormData();
    formData.append("stockID", stockID);
    formData.append("purchasingID", purchasingID);
    formData.append("materialID", purchasingMaterials[idx].materialID);
    formData.append("name", purchasingMaterials[idx].name);
    formData.append("size", purchasingMaterials[idx].size);
    formData.append("amount", purchasingMaterials[idx].amount);
    formData.append("balance", purchasingMaterials[idx].size * purchasingMaterials[idx].amount);
    formData.append("unit", purchasingMaterials[idx].unit);
    formData.append("expDate", purchasingMaterials[idx].expDate);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    return axios.post(url, formData, config);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await purchaseMaterial();
      if (res.statusText === "OK" && purchasingMaterials && purchasingMaterials.length > 0) {
        purchasingMaterials.map(async (el, idx) => {
          await addMStock(idx);
        });
      }
      alert("???????????? ??????");
    } catch (e) {
      alert("???????????? ??????");
    }
    navigate("/production/material");
  };
  return (
    <form onSubmit={submitHandler}>
      <div>
        <p>?????????</p>
        <input type="date" id="purchase_date" value={purchaseDate} onChange={changePurchaseDateHandler} />
      </div>
      <div>
        <p>??????</p>
        <select onChange={selectVendorHandler}>
          {vendors &&
            vendors?.map((vendor) => {
              return <VendorOption key={vendor.??????ID} vendor={vendor} />;
            })}
        </select>
      </div>
      <div>
        <p>????????? ??????</p>
        <select onChange={selectMaterialHandler}>
          {materials &&
            materials?.map((material) => {
              return <MaterialOption key={material.?????????ID} material={material} />;
            })}
        </select>
        <p>??????</p>
        <input type="number" id="amount" value={enteredAmount} onChange={changeAmountHandler} />
        <div>
          <p>????????????</p>
          <input type="date" id="exp_date" value={expDate} onChange={changeExpDateHandler} />
        </div>
        <div>
          <button type="button" onClick={addPurchasingMaterialHandler}>
            ????????? ????????? ??????
          </button>
          <PurchasingMaterials materials={purchasingMaterials} />
        </div>
      </div>
      <div>?????? ??? ?????? : {prevCost}</div>
      <div>
        <p>
          ????????? :
          <input type="number" onChange={changeDiscountHandler} value={discount} />%
        </p>
      </div>
      <div>?????? ?????? : {totalCost}</div>
      <div>
        <p>?????????</p>
        <input type="file" onChange={changeReceiptHandler} />
      </div>
      <button>?????? ??????</button>
    </form>
  );
};

export default PurchaseForm;
