import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import VendorOption from "./VendorOption";
import MaterialOption from "./MaterialOption";
import PurchasingMaterials from "./PurchasingMaterials";

const PurchaseMaterialsForm = () => {
  const purchasingID = Math.random().toString(32).slice(2);
  const navigate = useNavigate();
  const [vendors, setVendors] = useState("");
  const [materials, setMaterials] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [enteredAmount, setEnteredAmount] = useState(1);
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
    if (purchaseDate < expDate && enteredAmount > 0) {
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
      setEnteredAmount("");
    } else if (purchaseDate >= expDate) {
      alert(
        "?????? ?????? ?????? ????????? ?????????, ?????? ????????? ?????? ????????? ????????? ????????????. ?????? ??????????????????."
      );
    } else if (enteredAmount <= 0) {
      alert("????????? ????????? 1 ???????????? ????????? ??? ????????????");
    }
  };
  const purchaseCheckFunc = () => {
    if (selectedVendor.length === 0) {
      alert("????????? ???????????? ???????????????");
      return 0;
    } else if (purchaseDate >= expDate) {
      alert(
        "?????? ?????? ?????? ????????? ?????????, ?????? ????????? ?????? ????????? ????????? ????????????. ?????? ??????????????????."
      );
      return 0;
    } else if (prevCost === 0) {
      alert("????????? ????????? ???????????? ???????????????");
      return 0;
    } else if (totalCost === 0) {
      alert("????????? ???????????? ???????????????");
      return 0;
    } else {
      return 1;
    }
  };
  const purchaseMaterial = () => {
    const purchaseCheck = purchaseCheckFunc();
    if (purchaseCheck === 1) {
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
    }
  };
  /* purchasingMaterials??? ????????? ???????????? ????????? ??????, ?????? ?????? X
  const addMaterialCheckFunc = () => {
    if (purchasingMaterials.length === 0) {
      alert("???????????? ????????? ???????????? ???????????????.");
      return 0;
    } else {
      return 1;
    }
  }; */
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
    formData.append(
      "balance",
      purchasingMaterials[idx].size * purchasingMaterials[idx].amount
    );
    formData.append("unit", purchasingMaterials[idx].unit);
    formData.append("expDate", purchasingMaterials[idx].expDate);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    return axios.post(url, formData, config);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const purchaseCheck = purchaseCheckFunc();
    if(purchaseCheck === 1) {
      try {
        const res = await purchaseMaterial();
        if (
          res.statusText === "OK" &&
          purchasingMaterials &&
          purchasingMaterials.length > 0
        ) {
          purchasingMaterials.map(async (el, idx) => {
            await addMStock(idx);
          });
        }
        alert("???????????? ??????");
      } catch (e) {
        alert("???????????? ??????");
      }
      navigate("/production/purchase");
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div>
        <h1>????????? ??????</h1>
        <p>?????????</p>
        <input
          type="date"
          id="purchase_date"
          value={purchaseDate}
          onChange={changePurchaseDateHandler}
        />
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
              return (
                <MaterialOption key={material.?????????ID} material={material} />
              );
            })}
        </select>
        <p>??????</p>
        <input
          type="number"
          id="amount"
          value={enteredAmount}
          onChange={changeAmountHandler}
          min={1}
          required
        />
        <div>
          <p>????????????</p>
          <input
            type="date"
            id="exp_date"
            value={expDate}
            onChange={changeExpDateHandler}
          />
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
          ????????? :{" "}
          <input
            type="number"
            onChange={changeDiscountHandler}
            value={discount}
          />{" "}
          %
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

export default PurchaseMaterialsForm;
