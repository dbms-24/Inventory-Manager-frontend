import { Button, Container, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Input from "./Input";
import axios from "axios";

export default function Form({role, activeDressData, setActiveDressData, updateOpen, setUpdateOpen}) {

    const [purchaseDate, setPurchaseDate] = useState(role.purchase_date);
    const [sellingPrice, setSellingPrice] = useState(role.selling_price);
    const [purchasePrice, setPurchasePrice] = useState(role.purchase_price);
    const [damagedQuantity, setDamagedQuantity] = useState(role.damaged_quantity);
    const [availableQuantity, setAvailableQuantity] = useState(role.available_quantity);
    const [quality, setQuality] = useState(role.quality);
    function handleOnClick(){
      console.log('Clicked');
      const newData = activeDressData.map((data)=>{
          if(data.id == role.id){
            return {
              ...role,
            "purchase_date": purchaseDate,
            'available_quantity' : availableQuantity,
            "selling_price": sellingPrice,
            "purchase_price": purchasePrice,
            "damaged_quantity":damagedQuantity,
            "quality": quality,
            'selected' : true
            }
          }else return data;
      })
      setActiveDressData(newData);
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
                    <div className="py-8 text-center font-heading text-3xl text-primary-800">Update Active Dress Details</div>
                  <div className="grid grid-cols-2">
                   <Input name={"Purchase Date"} type={"date"} placeholder={"Enter purchase date"} value={purchaseDate} onChange={(e)=>setPurchaseDate(e.target.value)}  /> 
                   <Input name={"Selling Price"} type={"number"} placeholder={"Enter Selling Price"} value={sellingPrice} onChange={(e)=>setSellingPrice(e.target.value)}  />
                   <Input name={"Purchase Price"} type={"number"} placeholder={"Enter Purchase Price"} value={purchasePrice} onChange={(e)=>setPurchasePrice(e.target.value)}  /> 
                   <Input name={"Damaged Quantity"} type={"number"} placeholder={"Enter damaged Quantity"} value={damagedQuantity} onChange={(e)=>setDamagedQuantity(e.target.value)}  /> 
                   <Input name={"Quality"} type={"number"} placeholder={"Enter Quality"} value={quality} onChange={(e)=>setQuality(e.target.value)}  /> 
                   <Input name={"Available Quantity"} type={"number"} placeholder={"Enter Available Quantity"} value={availableQuantity} onChange={(e)=>setAvailableQuantity(e.target.value)}  /> 

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
