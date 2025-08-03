import CustomerCard from "../components/CustomerCard";
import CustomerDetails from "../components/CustomerDetails";
import Form from "../components/Form"
import Get from "../components/useGet"
import {ThemeContext} from '../App'
import { useContext, useEffect, useState } from "react";

function Customers() {
  const [open, setOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [customerModalId, setCustomerModalId] = useState(null);
  const [customerEditOpen, setCustomerEditOpen] = useState(0);
  const [customerEditInitialValue, setCustomerEditInitialValue] = useState(null);
  const customerData = Get(`${import.meta.env.VITE_BACKEND_URL}/customer`);
  const fields = [
    {
      name:"name",
      type:"text",
      placeholder:"Name",
      initialValue:""
    },
    {
      name:"address",
      type:"text",
      placeholder:"Address",
      initialValue:""
    },
    {
      name:"phone_number",
      type:"text",
      placeholder:"Phone Number",
      initialValue:""
    },
    {
      name:"email",
      type:"text",
      placeholder:"Email",
      initialValue:""
    },
    {
      name:"points",
      type:"number",
      placeholder:"Points",
      initialValue:0
    }
   ]
    return (
      <div className="min-h-screen">
        <Form open={open} setOpen={setOpen} heading={"Add a Customer"} method={"POST"} url={`${import.meta.env.VITE_BACKEND_URL}/customer`} submitText={"Submit"} fields={fields}/>
        <Form open={customerEditOpen} setOpen={setCustomerEditOpen} fields={fields} heading={`Edit ${customerEditInitialValue?.name} Details`}  url={`${import.meta.env.VITE_BACKEND_URL}/customer/${customerEditInitialValue?.id}`} submitText={"Edit Customer"} method={"PUT"} initialFieldsData={customerEditInitialValue}  />
        <div className={"flex justify-between px-10"}>
          <div className="flex flex-col justify-center font-heading text-2xl font-bold my-4">
            <div>
            Customer Details
          </div>
          </div>
        <div className="bg-primary-400 font-normal rounded-lg my-4 px-3 py-2 cursor-pointer" onClick={()=>setOpen(true)}>Add Customer</div>
        </div>
        <div className="grid grid-cols-4 gap-7 mx-10 my-10 cursor-pointer">

        {
          customerData && customerData.map((data)=>{
          return (
                  <div>
                    <CustomerCard customerDetails={data} setCustomerOpen={setCustomerOpen} setCustomerModalId={setCustomerModalId} setCustomerEditOpen={setCustomerEditOpen} setCustomerEditInitialValue={setCustomerEditInitialValue} />
                  </div>
                  )
        })
        }
      </div>
      <CustomerDetails customerOpen={customerOpen} setCustomerOpen={setCustomerOpen} customerModalId={customerModalId} setCustomerModalId={setCustomerModalId} data={customerData} />
      </div>
    )
  }
  
  export default Customers
