import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import { Routes, Route } from "react-router-dom";
import Main from "./Page/Main";
import Dashboard from "./Page/Dashboard";
import Production from "./Page/Production/Production";
import Sales from "./Page/Sales/Sales";
import Customers from "./Page/Customer/Customers";
import Reports from "./Page/Reports";
import AddCustomer from "./Page/Customer/AddCustomer";
import MaterialIndexPage from "./Page/Production/IndexRoutes/MaterialIndexPage";
import MaterialDetails from "./Page/Production/MaterialPages/MaterialDetails";
import ProductIndexPage from "./Page/Production/IndexRoutes/ProductIndexPage";
import ProductDetails from "./Page/Production/ProductPages/ProductDetail";
import TotalStocksIndexPage from "./Page/Production/IndexRoutes/TotalStocksIndexPage";
import ModifyProducts from "./Page/Production/ProductPages/ModifyProducts";
import VenderNCustomer from "./Page/Customer/VenderNCustomer";
import PointDetail from "./components/point/PointDetail";

function App() {
  return (
    <div className="App">
      <SideBar />
      {/* 사이드바를 통해 해당 페이지로 이동 가능 */}
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/production" element={<Production />}></Route>
        <Route
          path="/production/material"
          element={<MaterialIndexPage></MaterialIndexPage>}
        ></Route>
        <Route
          path="/production/material/:id"
          element={<MaterialDetails></MaterialDetails>}
        ></Route>
        <Route
          path="/production/product"
          element={<ProductIndexPage></ProductIndexPage>}
        ></Route>
        <Route
          path="/production/product/:id"
          element={<ProductDetails></ProductDetails>}
        ></Route>
        <Route
          path="/production/product/modify/:id"
          element={<ModifyProducts></ModifyProducts>}
        ></Route>
        <Route
          path="/production/total-stocks"
          element={<TotalStocksIndexPage></TotalStocksIndexPage>}
        ></Route>
        <Route path="/sales" element={<Sales />}></Route>
        <Route path="/venderncustomer" element={<VenderNCustomer />}></Route>
        <Route path="/customers" element={<Customers />}></Route>
        <Route path="/customers/add" element={<AddCustomer />}></Route>
        <Route path="/customers/point/:id" element={<PointDetail/>}></Route>
        <Route path="/reports" element={<Reports />}></Route>
      </Routes>
    </div>
  );
}

export default App;
