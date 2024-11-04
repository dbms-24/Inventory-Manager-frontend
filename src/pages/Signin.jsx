import { TextField } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";


function Signin({setUserDetails}) {
    const navigate = useNavigate();
    const [phoneNum, setPhoneNum] = useState("");
    const [password, setPassword] = useState("");
    const userDetails = useContext(UserContext);
    useEffect(()=>{
      if(userDetails){
        if(userDetails.role == "ADMIN"){
          navigate('/admin')
        }else{
          navigate('/')
        }
      }
    },[])
    async function handleOnClick(){
        try{
        const res = await axios.post('http://localhost:8080/auth/authenticate',{
                      'phone_number' : phoneNum,
                      'password' : password
                        })
        if(res.status == 200){
          const token = res.data.token;
          window.localStorage.setItem('token', `Bearer ${token}`);
          const newToken = 'Bearer '+token;
      axios.get('http://localhost:8080/',{
        headers : {
          'Authorization' : newToken,
          'Content-Type' : 'application/json'
        }
      }).then((res)=>{
           if(res.status == 200){
              setUserDetails(res.data);
              if(res.data.role == "ADMIN"){
                navigate('/admin');
              }else {
                navigate('/');
              }
            }
      }).catch((err)=>{
        console.log(err);
        window.localStorage.removeItem("store_token");
        navigate('/signin');
      })

        }else{
          window.location.reload();
        }

        }catch(err){
          console.log(err);
      }
    }
    return (
      <div className="flex flex-col justify-center min-h-screen">
        <div className="flex justify-center">
          <div className="text-center flex flex-col bg-secondary-200 text-black border border-primary-500 rounded-xl px-20 py-12">
            <div className="font-heading text-3xl pb-8">Login</div>
            <div className="pb-8">
            <TextField id="outlined-basic" label="Phone Number" value={phoneNum} onChange={(e)=>setPhoneNum(e.target.value)}
            type="text" variant="outlined" 
            sx={{
              "& .MuiOutlinedInput-root": {
              color: "#000",
              fontFamily: "Arial",
              fontWeight: "bold",

              "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000",
              borderWidth: "2px",
              borderRadius : "4px"
              },
            },
              "& .MuiInputLabel-outlined": {
              color: "#000",
              fontWeight: "bold",
              borderRadius : "4px"
            },
           }}  
          className="border border-primary-500 rounded-lg pb-8" />
          </div>
          <div className="pb-8">
          <TextField id="outlined-adornment-password" label="Password" 
            type="password" variant="outlined"
            value={password} onChange={(e)=>setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
              color: "#000",
              fontFamily: "Arial",
              fontWeight: "bold",

              "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000",
              borderWidth: "2px",
              borderRadius : "4px"
              },
            },
              "& .MuiInputLabel-outlined": {
              color: "#000",
              fontWeight: "bold",
              borderRadius : "4px"
            },
           }}  
          className="border rounded-lg" />
          </div>
          <div className={`flex justify-center text-white`}>
          <div className="font-normal bg-primary-500 text-white px-4 py-3 text-xl rounded-lg  transition-all duration-300 ease-in-out hover:scale-105 hover:border-primary-400 hover:shadow-lg cursor-pointer "
            onClick={handleOnClick}>Log in</div>
          </div>
          <div className="pt-2">
          Don't have an account? <Link to={'/home'} className="text-blue-500">home</Link>
          </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Signin;
