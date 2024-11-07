import { Button, Container, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Input from "./Input";
import axios from "axios";

export default function Form({role, inventoryData, setInventoryData, updateOpen, setUpdateOpen}) {

    const [initialGood, setInitialGood] = useState(role?.new_required_quantity);
    const [initialDamage, setInitialDamage] = useState(role?.new_damaged_quantity);
    
    function handleOnClick(){
      const newData = inventoryData.map((data)=>{
          if(data.id == role.id){
            return {
              ...role,
              'new_damaged_quantity' : initialDamage,
              'new_required_quantity' : initialGood,
              'selected' : true
            }
          }else return data;
      })
      setInventoryData(newData);
      console.log(newData)
      setUpdateOpen(false);

    }

    return (
        <>
        <Modal open={updateOpen} onClose={()=>setUpdateOpen(false)} className="focus:outline-none">
            <div className="flex flex-col justify-center h-screen">
              <div className="flex justify-center">
                <div className="bg-secondary-300 rounded-lg text-background m-10 border-2 w-1/2 px-3">
                    <div className="flex justify-end cursor-pointer">
                        <CloseIcon 
                        sx={{ color: 'red', cursor: 'pointer', fontSize: 30 }}
                        color="font-bold text-xl mt-2" onClick={()=>setUpdateOpen(false)} />
                    </div>
                    <div className="py-8 text-center font-heading text-3xl text-primary-800">Update Inventory Quantities</div>
                  <div className="grid grid-cols-2">
                   <Input name={"Good Stock"} type={"number"} placeholder={"Enter req. good Stock"} value={initialGood} onChange={(e)=>setInitialGood(e.target.value)}  /> 
                   <Input name={"Discount Stock"} type={"number"} placeholder={"Enter req. discnt Stock"} value={initialDamage} onChange={(e)=>setInitialDamage(e.target.value)}  /> 
                  </div>
                    <div className="flex justify-center">
                        <div onClick={handleOnClick}
                        className="cursor-pointer m-3 font-normal py-2 px-3 border-2 rounded-lg bg-primary-500 text-white">
                            Update
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </Modal>
        </>
    )
};
