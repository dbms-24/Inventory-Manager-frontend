import { Button, Container, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Input from "./Input";
import axios from "axios";
// Fields syntax
// {
//  name:"String" // Must be unique and case semsitive
//  type:"String" // text, email, password
//  placeholder:"String"
//  initialValue 
// }
// For everythig we need to send the emtire
// Method is either PUT or POST

export default function Form({open, setOpen, heading, method, url, submitText, fields, initialFieldsData = null }) {
    let initialState = {}
    fields.map((field) => {
        initialState = {
            ...initialState,
            [field.name]: field.initialValue
          }
    })
    const [formState, setFormState] = useState(initialState);
    useEffect(()=>{
    if(method == "PUT"){
      // For Put method we need to send the data of the fields present
      if(initialFieldsData){
        fields.map((field)=>{
        initialState = {
            ...initialState,
            [field.name]:initialFieldsData[field.name]
          }
        })
       setFormState(initialState);
      }
    }
    },[initialFieldsData])

    function handleOnChange(e, name) {
        setFormState({
            ...formState,
            [name]: e.target.value
        })
    }
    async function handleOnClick() {
        console.log(formState)
        if(method === "POST") {
            try {
                const response = await axios.post(url, formState)
                console.log(response)
                setOpen(false);
                window.location.reload();
            } catch (error) {
                console.log(error)
                setOpen(false);
                 window.location.reload();

            }
        }else if(method === "PUT") {
            try {
                const response = await axios.put(url, formState)
                console.log(response)
                setOpen(false);
               window.location.reload();

            } catch (error) {
                console.log(error)
                setOpen(false);
               window.location.reload();

            }
        }
    }
    return (
        <>
        <Modal open={open} onClose={()=>setOpen(false)} className="focus:outline-none">
            <div className="flex flex-col justify-center h-screen">
                <Container className="bg-secondary-300 rounded-lg text-background m-10 border-2">
                    <div className="flex justify-end cursor-pointer">
                        <CloseIcon 
                        sx={{ color: 'red', cursor: 'pointer', fontSize: 30 }}
                        color="font-bold text-xl mt-2" onClick={()=>setOpen(false)} />
                    </div>
                    <div className="py-8 text-center font-heading text-3xl text-primary-800">{heading}</div>
                    <div className="grid grid-cols-2">
                        {
                            fields.map((field, index) => (
                                <Input key={index} type={field.type} placeholder={field.placeholder} value={formState[field.name]} onChange={(e)=>handleOnChange(e, field.name)} name={field.name} />
                            ))
                        }
                    </div>
                    <div className="flex justify-center">
                        <div onClick={handleOnClick}
                        className="cursor-pointer m-3 font-normal py-2 px-3 border-2 rounded-lg bg-primary-500 text-white">
                            {submitText}
                        </div>
                    </div>
                </Container>

            </div>
        </Modal>
        </>
    )
}
