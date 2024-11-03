import { useEffect, useState } from "react";
import { Modal, Container } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useContext } from "react"
import { UserContext } from "../App"
import { ThemeContext } from "../App";


function UserDetails({userOpen,setUserOpen}){
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const userDetails = useContext(UserContext);


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
                        <div className="text-center font-bold text-black">{userDetails.name[0]}</div>
                        <div className="text-center font-heading font-medium text-3xl text-black">{userDetails.name}</div>
                        <div className="text-center font-normal text-xl text-gray-500">{userDetails.role}</div>
                        <div className="text-center font-normal text-xl text-gray-500">{userDetails.phone_number}</div>
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