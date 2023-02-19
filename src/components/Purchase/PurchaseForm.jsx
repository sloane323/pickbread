import { useEffect, useState } from "react";
import axios from "axios";
import VendorOption from "./VendorOption";
import MaterialOption from "./MaterialOption";
import PurchasingMaterials from "./PurchasingMaterials";

const PurchaseForm = () => {
  const purchasingID = Math.random().toString(32).slice(2);
  const [vendors, setVendors] = useState("");
  const [materials, setMaterials] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [purchasingMaterials, setPurchaingMaterials] = useState([]);
  const [expDate, setExpDate] = useState(new Date().toISOString().slice(0, 10));
  const totalCost = purchasingMaterials
    ? purchasingMaterials.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.cost * currentValue.amount;
      }, 0)
    : 0;
  const [receipt, setReceipt] = useState("");
  const [discount, setDiscount] = useState(0);
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
      materialID: selectedMaterial.원자재ID,
      name: selectedMaterial.이름,
      size: selectedMaterial.사이즈,
      cost: selectedMaterial.현재가격,
      unit: selectedMaterial.단위,
      amount: enteredAmount,
      expDate: expDate,
    };
    setPurchaingMaterials((prev) => {
      return [...prev, addedMaterial];
    });
    setEnteredAmount("");
  };
  const purchaseMaterial = () => {
    const url = "/api/purchasing";
    const formData = new FormData();
    formData.append("purchasingID", purchasingID);
    formData.append("vendorID", selectedVendor.벤더ID);
    formData.append("purchaseDate", purchaseDate);
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
      alert("구매등록 완료");
    } catch (e) {
      alert("구매등록 실패");
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="purchase_date">구매일</label>
        <input type="date" id="purchase_date" value={purchaseDate} onChange={changePurchaseDateHandler} />
      </div>
      <div>
        <label htmlFor="vendor">벤더</label>
        <select onChange={selectVendorHandler}>
          {vendors &&
            vendors?.map((vendor) => {
              return <VendorOption key={vendor.벤더ID} vendor={vendor} />;
            })}
        </select>
      </div>
      <div>
        <span>원자재 종류</span>
        <select onChange={selectMaterialHandler}>
          {materials &&
            materials?.map((material) => {
              return <MaterialOption key={material.원자재ID} material={material} />;
            })}
        </select>
        <label htmlFor="amount">수량</label>
        <input type="number" id="amount" value={enteredAmount} onChange={changeAmountHandler} />
        <label htmlFor="exp_date">사용기한</label>
        <input type="date" id="exp_date" value={expDate} onChange={changeExpDateHandler} />
        <button type="button" onClick={addPurchasingMaterialHandler}>
          추가
        </button>
        <PurchasingMaterials materials={purchasingMaterials} />
      </div>
      <div>할인 전 금액 : {totalCost}</div>
      <label>
        할인율 : <input type="number" onChange={changeDiscountHandler} value={discount} /> %
      </label>
      <div>최종 금액 : {totalCost - totalCost * discount * 0.01}</div>
      <div>
        <span>영수증</span>
        <input type="file" onChange={changeReceiptHandler} />
      </div>
      <button>구매 등록</button>
    </form>
  );
};

export default PurchaseForm;
