import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import { Routes, Route } from "react-router-dom";
import Main from "./Page/Main";
import Dashboard from "./Page/Dashboard";
import Production from "./Page/Production/Production";
import Sales from "./Page/Sales/Sales";
import Customers from "./Page/Customers";
import Reports from "./Page/Reports";
import AddMaterial from "./Page/Production/AddMaterial";
import AddProduct from "./Page/Production/AddProduct";
import Stock from "./Page/Production/Stock";
import StockDetail from "./Page/Production/StockDetail";
import Purchase from "./Page/Production/Purchase";
import AddVendor from "./Page/Production/AddVendor";
import Manufacture from "./Page/Production/Manufacture";

function App() {
  return (
    <div className="App">
      <SideBar />
      {/* 사이드바를 통해 해당 페이지로 이동 가능 */}
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/production" element={<Production />} />
        <Route path="/production/add-material" element={<AddMaterial />} />
        <Route path="/production/purchase" element={<Purchase />} />
        <Route path="/production/add-product" element={<AddProduct />} />
        <Route path="/production/manufacture" element={<Manufacture/>}/>
        <Route path="/production/add-vendor" element={<AddVendor />} />
        <Route path="/production/stock" element={<Stock />} />
        <Route path="/production/stock/:id" element={<StockDetail />} />
        <Route path="/sales" element={<Sales />}></Route>
        <Route path="/customers" element={<Customers />}></Route>
        <Route path="/reports" element={<Reports />}></Route>
      </Routes>
    </div>
  );
}

export default App;
