import { BrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import EmployeesPage from "./pages/Employees"
import Trasnsactions from "./pages/Transactions"
import Dresses from "./pages/Dresses"
import { Routes, Route } from "react-router-dom"
import Suppliers from "./pages/Suppliers"
import Customers from "./pages/Customers"
import Stock from "./pages/Stock"
import { useState } from "react"
import { DarkMode, LightMode } from "@mui/icons-material"
import { createContext } from "react";

export const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  function handleThemeChange(){
  if(theme == 'light'){
    setTheme('dark');
  }else {
    setTheme('light');
  }
}
  return (
  <BrowserRouter>
  <div className={`${(theme == 'light') ? 'text-black ' : "text-white "}`+`${(theme == 'light') ? 'bg-white ' : "bg-background "}`+'relative'}>
    <ThemeContext.Provider value={theme} >
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/employees' element={<EmployeesPage />} />
    <Route path='/transactions' element={<Trasnsactions />} />
    <Route path='/dresses' element={<Dresses />} />
    <Route path='/customers' element={<Customers />} />
    <Route path='/suppliers' element={<Suppliers />} />
    <Route path='/stock' element={<Stock />} />
  </Routes>
  <div className={"absolute bottom-6 right-6 border-2 p-2 rounded-lg border-secondary-500 transition-all duration-300 ease-in-out hover:scale-125 hover:border-primary-400 hover:shadow-lg " + `${(theme=='dark') ? 'bg-white' : 'bg-background'}`} onClick={handleThemeChange}>
    {
      (theme == 'dark')?
      <LightMode className="text-orange-700" /> :
      <DarkMode className="text-white" />
    }
  </div>
  </ThemeContext.Provider>
  </div>
</BrowserRouter>
  )
}

export default App
