import Home from "./pages/Home"
import EmployeesPage from "./pages/Employees"
import Trasnsactions from "./pages/Transactions"
import Dresses from "./pages/Dresses"
import { Routes, Route } from "react-router-dom"
import Suppliers from "./pages/Suppliers"
import Customers from "./pages/Customers"
import Stock from "./pages/Stock"
import { useEffect, useState } from "react"
import { DarkMode, LightMode } from "@mui/icons-material"
import { createContext } from "react";
import Signin from "./pages/Signin"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import AppBar from './components/AppBar';

export const ThemeContext = createContext('light');
export const UserContext = createContext(null);
function App() {
    
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  useEffect(()=>{
    const token = window.localStorage.getItem('token');
    console.log("token",token);
    if(!token){
      navigate('/signin');
    }else{
      axios.get('http://localhost:8080/',{
        headers : {
          'Authorization' : token,
          'Content-Type' : 'application/json'
        }
      }).then((res)=>{
          console.log("Reached ", res.status)
          if(res.status == 200){
            // The role of this user is USER 
              setUserDetails(res.data);
          }else {
            // ROLE is not a USER chk for ADMIN
            axios.get(('http://localhost:8080/admin/healthy'),{
              'headers' : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
              }
            }).then((res)=>{
                if(res.status == 200){
                    setUserDetails(res.data);
                }else {
                  window.localStorage.removeItem("token");
                  navigate('/signin');
                }
            }).catch((err)=>{
              // Error on both so invalidate token and request for signin
              console.log(err);
              window.localStorage.removeItem("token");
              navigate('/signin');
            })
          }
      }).catch((err)=>{
        console.log(err);
        window.localStorage.removeItem("store_token");
        navigate('/signin');
      })
      
    }
  },[])

  const [theme, setTheme] = useState('light');
  function handleThemeChange(){
  if(theme == 'light'){
    setTheme('dark');
  }else {
    setTheme('light');
  }
}
  return (
  <div className={`${(theme == 'light') ? 'text-black ' : "text-white "}`+`${(theme == 'light') ? 'bg-white ' : "bg-background "}`+'relative'}>
    <ThemeContext.Provider value={theme} >
    <UserContext.Provider value={userDetails} >
    <AppBar />
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/signin' element={<Signin />} />
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
  </UserContext.Provider>
  </ThemeContext.Provider>
  </div>
  )
}

export default App
