import axios from "axios";
import { useState, useEffect } from "react";
import { getNowDate, getTwoWeeksDate } from "../../common";
import ProductionOption from "./ProductionOption";

const ManufactureForm = () => {
  const [productions, setProductions] = useState();
  const [selectedProduction, setSelectedProduction] = useState();
  const [enteredAmount, setEnteredAmount] = useState(1);
  const [manufactureDate, setManufactureDate] = useState(getNowDate());
  const [expiryDate, setExpiryDate] = useState(getTwoWeeksDate());
  const manufactureId = Math.random().toString(32).slice(2);
  const getProductions = async () => {
    const url = "/api/production";
    const response = await axios.get(url);
    setProductions(response.data);
  };
  useEffect(() => {
    getProductions();
  }, []);
  useEffect(() => {
    if (!selectedProduction && productions && productions.length > 0) {
      setSelectedProduction(productions[0]);
    }
  }, [productions]);
  const selectedProductionHandler = (e) => {
    const idx = e.target.options.selectedIndex;
    setSelectedProduction(productions[idx]);
    console.log(selectedProduction);
  };
  const enteredAmountHandler = (e) => {
    setEnteredAmount(e.target.value);
  };
  const manufactureDateHandler = (e) => {
    setManufactureDate(e.target.value);
    const expiryValue = getTwoWeeksDate(e.target.value);
    setExpiryDate(expiryValue);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const resManufacture = await manufacturePost();
    const resInventory = await inventoryPost();
    setSelectedProduction();
    setEnteredAmount(1);
    setManufactureDate(getNowDate());
  };
  const manufacturePost = () => {
    const url = "/api/manufacture";
    const formData = new FormData();
    formData.append("manufactureId", manufactureId);
    formData.append("selectedProductionId", selectedProduction.제품ID);
    formData.append("enteredAmount", enteredAmount);
    formData.append("manufactureDate", manufactureDate);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    console.log(formData);
    return axios.post(url, formData, config);
  };
  const inventoryPost = () => {
    const url = "/api/inventory";
    const formData = new FormData();
    formData.append("manufactureId", manufactureId);
    formData.append("selectedProductionId", selectedProduction.제품ID);
    formData.append("presentAmount", enteredAmount);
    formData.append("expiryDate", expiryDate);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    console.log(formData);
    return axios.post(url, formData, config);
  }
  return (
    <form onSubmit={onSubmit}>
      <div>
        <span>제품 종류</span>
        <select onChange={selectedProductionHandler}>
          {productions &&
            productions?.map((production) => {
              return (
                <ProductionOption
                  key={production.제품ID}
                  production={production}
                />
              );
            })}
        </select>
      </div>
      <div>
        <label>
          생산 개수
          <input type="number" value={enteredAmount} onChange={enteredAmountHandler} min={1}/>
        </label>
      </div>
      <div>
        <label>
          생산일
          <input
            type="date"
            value={manufactureDate}
            onChange={manufactureDateHandler}
          />
        </label>
      </div>
      <input type="submit" value="제출 " />
    </form>
  );
};

export default ManufactureForm;
