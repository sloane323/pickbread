import './App.css';
import SideBar from './components/SideBar/SideBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Page/Main';
import Dashboard from './Page/Dashboard';
import Production from './Page/Production';
import Sales from './Page/Sales';
import Customers from './Page/Customers';
import Reports from './Page/Reports';
import AddMaterial from './Page/AddMaterial';

function App() {
  return (
    <div className="App">
      <SideBar />
      
       {/* 사이드바를 통해 해당 페이지로 이동 가능 */}
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/production" element={<Production />}></Route>
        <Route path='/production/add-material' element={<AddMaterial></AddMaterial>}></Route>
        <Route path="/sales" element={<Sales />}></Route>
        <Route path="/customers" element={<Customers />}></Route>
        <Route path="/reports" element={<Reports />}></Route>
      </Routes>
    </div>
  );
}

export default App;
