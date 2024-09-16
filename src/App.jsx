import { BrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import EmployeesPage from "./pages/Employees"
import Trasnsactions from "./pages/Transactions"
import Dresses from "./pages/Dresses"
import { Routes, Route } from "react-router-dom"
import Suppliers from "./pages/Suppliers"
import Customers from "./pages/Customers"
import Stock from "./pages/Stock"
import AppBar from "./components/AppBar"
function App() {

  return (
  <BrowserRouter>
  <AppBar />
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/employees' element={<EmployeesPage />} />
    <Route path='/transactions' element={<Trasnsactions />} />
    <Route path='/dresses' element={<Dresses />} />
    <Route path='/customers' element={<Customers />} />
    <Route path='/suppliers' element={<Suppliers />} />
    <Route path='/stock' element={<Stock />} />
  </Routes>
</BrowserRouter>
  )
}

export default App
