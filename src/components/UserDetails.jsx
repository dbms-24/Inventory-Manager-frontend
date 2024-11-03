import { useEffect, useState } from "react";
import { Modal, Container } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useContext } from "react"
import { UserContext } from "../App"
import { ThemeContext } from "../App";
import { useNavigate } from "react-router-dom";


function UserDetails({userOpen,setUserOpen}){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const userDetails = useContext(UserContext);
    function handleLogout(){
      window.localStorage.removeItem('token');
      setUserOpen(false);
      navigate('/signin');
      window.location.reload();
    }

    function handleOnclose(){
        setUserOpen(false);
    }

    return(
        <Modal open={userOpen} onClose={handleOnclose}>
            <div className="flex justify-center">
            <div className="flex flex-col justify-center h-screen">
                <div className="bg-secondary-300 rounded-lg text-background border-2 pt-4 pb-6 w-96">
                    <div className="flex justify-end cursor-pointer px-2">
                        <CloseIcon 
                        sx={{ color: 'red', cursor: 'pointer', fontSize: 30 }}
                        color="font-bold text-xl mt-2" onClick={handleOnclose} />
                    </div>
                    {
                    loading && <div className="text-center text-black font-heading text-2xl animate-pulse">Loading ...</div>
                }    
                {
                    (!loading && UserDetails) ? 
                    <div>
                        <div className="flex justify-center">
                         <div className="text-center text-black text-3xl px-6 py-3 my-8 rounded-full border-2 border-primary-500 font-heading">{userDetails.name[0].toUpperCase()}</div>
                        </div>
                        <div className="text-center font-heading font-medium text-3xl text-black">{userDetails.name}</div>
                        <div className="text-center font-normal text-xl text-gray-500">{userDetails.phone_number}</div>
                        <div className="flex justify-center text-red-500 font-heading">
                          <div className="border-2 border-red-500 rounded-lg px-3 py-2 my-4  transition-all duration-300 ease-in-out hover:scale-110 hover:border-red-400 hover:shadow-lg cursor-pointer " onClick={handleLogout}>Log Out</div>
                        </div>
                    </div>:
                    <div className="text-center text-black font-heading text-2xl">
                        Oops User data not found !
                    </div>
                }               
                
                </div>
            </div>
            </div>
      </Modal>

    )
}

export default UserDetails
