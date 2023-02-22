import axios from "axios";
import { useState, useEffect } from "react";
import { getNowDate, getTwoWeeksDate } from "../../common";
import MaterialStockOption from "./MaterialStockOption";
import ProductionOption from "./ProductionOption";

const ManufactureForm = () => {
  const [productions, setProductions] = useState();
  const [selectedProduction, setSelectedProduction] = useState();
  const [materialStocks, setMaterialStocks] = useState();
  const [selectedMaterialStock, setSelectedMaterialStock] = useState();
  const [selectedMaterialStockWrap, setSelectedMaterialStockWrap] = useState(
    []
  );
  const [enteredAmount, setEnteredAmount] = useState(1);
  const [materialUsage, setMaterialUsage] = useState(1);
  const [materialUsageWrap, setMaterialUsageWrap] = useState([]);
  const [manufactureDate, setManufactureDate] = useState(getNowDate());
  const [expiryDate, setExpiryDate] = useState(getTwoWeeksDate());
  const [productDispose, setProductDispose] = useState(false);
  const [materialDispose, setMaterialDispose] = useState(false);
  const [materialDisposeWrap, setMaterialDisposeWrap] = useState([]);
  const manufactureId = Math.random().toString(32).slice(2);
  const productStockId = Math.random().toString(32).slice(2);
  const getProductions = async () => {
    const url = "/api/production";
    const response = await axios.get(url);
    setProductions(response.data);
  };
  const getMaterialStocks = async () => {
    const url = "/api/m_stock";
    const response = await axios.get(url);
    setMaterialStocks(response.data);
  };
  useEffect(() => {
    getProductions();
    getMaterialStocks();
  }, []);
  useEffect(() => {
    if (!selectedProduction && productions && productions.length > 0) {
      setSelectedProduction(productions[0]);
    }
    if (!selectedMaterialStock && materialStocks && materialStocks.length > 0) {
      const id = materialStocks[0].재고ID;
      const type = materialStocks[0].종류;
      setSelectedMaterialStock({ id, type });
    }
  }, [productions, materialStocks]);
  const onSubmit = async (event) => {
    event.preventDefault();
    const reqManufacture = await manufacturePost();
    const reqProductStock = await productStockPost();
    for (let i = 0; i < selectedMaterialStockWrap.length; i++) {
      const req = await materialUsagePost(i);
    }
    for (let i = 0; i < materialUsageWrap.length; i++) {
      const req = await materialCalcPost(i);
    }
    setEnteredAmount(1);
    setMaterialUsage(1);
    setMaterialUsageWrap([]);
    setManufactureDate(getNowDate());
    setExpiryDate(getTwoWeeksDate());
    setSelectedProduction(productions[0]);
    setProductDispose(false);
    setSelectedMaterialStockWrap([]);
    setMaterialDispose(false);
    setMaterialDisposeWrap([]);
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
  const productStockPost = () => {
    const url = "/api/p_stock";
    const formData = new FormData();
    formData.append("productStockId", productStockId);
    formData.append("manufactureId", manufactureId);
    formData.append("selectedProductionId", selectedProduction.제품ID);
    formData.append("presentAmount", enteredAmount);
    formData.append("expiryDate", expiryDate);
    formData.append("productDispose", productDispose);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    console.log(formData);
    return axios.post(url, formData, config);
  };
  const materialUsagePost = (i) => {
    if (selectedMaterialStockWrap.length && materialUsageWrap.length > 0) {
      const url = "/api/m_usage";
      const formData = new FormData();
      formData.append("manufactureId", manufactureId);
      formData.append(
        "selectedMaterialStockId",
        selectedMaterialStockWrap[i].id
      );
      formData.append("materialUsage", materialUsageWrap[i]);
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      console.log(formData);
      return axios.post(url, formData, config);
    }
  };
  const materialCalcPost = (i) => {
    if (materialUsageWrap.length && materialDisposeWrap.length > 0) {
      const url = "/api/m_stock";
      const formData = new FormData();
      formData.append("materialUsage", materialUsageWrap[i]);
      formData.append("materialDispose", materialDisposeWrap[i]);
      formData.append(
        "selectedMaterialStockId",
        selectedMaterialStockWrap[i].id
      );
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      console.log(formData);
      return axios.put(url, formData, config);
    }
  };
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
  const selectMaterialStockHandler = (e) => {
    const idx = e.target.options.selectedIndex;
    const id = materialStocks[idx].재고ID;
    setSelectedMaterialStock({ id, type: e.target.value });
  };
  const materialUsageHandler = (e) => {
    setMaterialUsage(e.target.value);
  };
  const addMaterialUsage = () => {
    setSelectedMaterialStockWrap((prev) => {
      return [...prev, selectedMaterialStock];
    });
    setMaterialUsageWrap((prev) => {
      return [...prev, materialUsage];
    });
    setMaterialDisposeWrap((prev) => {
      return [...prev, materialDispose];
    })
  };
  const productDisposeHandler = () => {
    if (productDispose === false) {
      setProductDispose(true);
    } else {
      setProductDispose(false);
    }
  };
  const materialDisposeHandler = () => {
    if(materialDispose === false) {
      setMaterialDispose(true);
    } else {
      setMaterialDispose(false);
    }
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
          <input
            type="number"
            value={enteredAmount}
            onChange={enteredAmountHandler}
            min={1}
          />
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
      <div>
        <b>원자재 재고 및 사용량</b>
        <select onChange={selectMaterialStockHandler}>
          {materialStocks &&
            materialStocks?.map((materialStock) => {
              return (
                <MaterialStockOption
                  key={materialStock.재고ID}
                  materialStock={materialStock}
                />
              );
            })}
        </select>
      </div>
      <label>
        원자재 사용량
        <input
          type="number"
          value={materialUsage}
          onChange={materialUsageHandler}
          min={1}
        ></input>
      </label>
      <div>
        <button type="button" onClick={addMaterialUsage}>
          원자재 및 사용량, 유통 및 폐기 상태 추가
        </button>
        {selectedMaterialStockWrap &&
          selectedMaterialStockWrap.length > 0 &&
          selectedMaterialStockWrap.map((selectedMaterialStock, index) => (
            <div key={index}>
              <p>{selectedMaterialStock.id}</p>
              <p>{selectedMaterialStock.type}</p>
            </div>
          ))}
        {materialUsageWrap &&
          materialUsageWrap.length > 0 &&
          materialUsageWrap.map((materialUsage, index) => (
            <div key={index}>
              <p>{materialUsage}</p>
            </div>
          ))}
        {materialDisposeWrap &&
          materialDisposeWrap.length > 0 && materialDisposeWrap.map((materialDispose, index) => (
            <div key={index}>
              <p>{materialDispose ? "원자재 폐기 진행" : "원자재 유통 중"}</p>
            </div>
          ))}
        <div>
          <button type="button" onClick={productDisposeHandler}>
            제품 폐기 여부 체크
          </button>
          {productDispose ? <p>제품 폐기</p> : <p>제품 유통</p>}
          <button type="button" onClick={materialDisposeHandler}>
            원자재 폐기 여부 체크
          </button>
          {materialDispose ? <p>원자재 폐기</p> : <p>원자재 유통</p>}
        </div>
      </div>
      <input type="submit" value="제출 " />
    </form>
  );
};

export default ManufactureForm;
