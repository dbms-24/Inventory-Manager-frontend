import Home from "./pages/Home"
import EmployeesPage from "./pages/Employees"
import Trasnsactions from "./pages/Transactions"
import Dresses from "./pages/Dresses"
import { Routes, Route } from "react-router-dom"
import Suppliers from "./pages/Suppliers"
import Customers from "./pages/Customers"
import { useEffect, useState } from "react"
import { createContext } from "react";
import Signin from "./pages/Signin"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import AppBar from './components/AppBar';
import Admin from "./pages/Admin"

export const ThemeContext = createContext('light');
export const UserContext = createContext(null);
function App() {
    
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  useEffect(()=>{
    const token = window.localStorage.getItem('token');
    if(!token){
      navigate('/signin');
    }else{
      if(!userDetails){
      axios.get(import.meta.env.VITE_BACKEND_URL,{
        headers : {
          'Authorization' : token,
          'Content-Type' : 'application/json'
        }
      }).then((res)=>{
        if(res.status == 200){
          setUserDetails(res.data);
        }
      }).catch((err)=>{
        console.log(err);
        window.localStorage.removeItem("store_token");
        navigate('/signin');
      })
    }
    }
  },[])

  const [theme, setTheme] = useState('light');
  return (
  <div className={`${(theme == 'light') ? 'text-black ' : "text-white "}`+`${(theme == 'light') ? 'bg-white ' : "bg-background "}`+'relative'}>
    <ThemeContext.Provider value={theme} >
    <UserContext.Provider value={userDetails} >
    <AppBar setTheme={setTheme}/>
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/signin' element={<Signin setUserDetails={setUserDetails} />} />
    <Route path='/employees' element={<EmployeesPage />} />
    <Route path='/transactions' element={<Trasnsactions />} />
    <Route path='/dresses' element={<Dresses />} />
    <Route path='/customers' element={<Customers />} />
    <Route path='/suppliers' element={<Suppliers />} />
    <Route path='/admin' element={<Admin />} />
  </Routes>
  
  </UserContext.Provider>
  </ThemeContext.Provider>
  </div>
  )
}

export default App
