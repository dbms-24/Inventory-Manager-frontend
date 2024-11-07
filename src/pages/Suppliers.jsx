import SupplierCard from "../components/SupplierCard";
import SupplierDetails from "../components/SupplierDetails";
import Form from "../components/Form"
import Get from "../components/useGet"
import {ThemeContext} from '../App'
import { useContext, useEffect, useState } from "react";

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
 ]

function Suppliers() {
  const [open, setOpen] = useState(false);
  const [supplierOpen, setSupplierOpen] = useState(false);
  const [supplierModalId, setSupplierModalId] = useState(null);
  const [supplierEditOpen, setSupplierEditOpen] = useState(0);
  const [supplierEditInitialValue, setSupplierEditInitialValue] = useState(null);
  const supplierData = Get("http://localhost:8080/supplier");

  return (
    <div className="min-h-screen">
        <Form open={open} setOpen={setOpen} heading={"Add a Supplier"} method={"POST"} url={'http://localhost:8080/supplier'} submitText={"Submit"} fields={fields}/>
        <Form open={supplierEditOpen} setOpen={setSupplierEditOpen} fields={fields} heading={`Edit ${supplierEditInitialValue?.name} Details`}  url={`http://localhost:8080/supplier/${supplierEditInitialValue?.id}`} submitText={"Edit Supplier"} method={"PUT"} initialFieldsData={supplierEditInitialValue}  />
        <div className={"flex justify-between px-10"}>
          <div className="flex flex-col justify-center font-heading text-2xl font-bold my-4">
            <div>
            Supplier Details
          </div>
          </div>
        <div className="bg-primary-400 font-normal rounded-lg my-4 px-3 py-2 cursor-pointer" onClick={()=>setOpen(true)}>Add Supplier</div>
        </div>
      <div className="grid grid-cols-4 gap-7 mx-10 my-10 cursor-pointer">

        {
          supplierData && supplierData.map((data)=>{
          return (
                  <div>
                    <SupplierCard supplierDetails={data} setSupplierOpen={setSupplierOpen} setSupplierModalId={setSupplierModalId} setSupplierEditOpen={setSupplierEditOpen} setSupplierEditInitialValue={setSupplierEditInitialValue} />
                  </div>
                  )
        })
        }
      </div>
        <SupplierDetails supplierOpen={supplierOpen} setSupplierOpen={setSupplierOpen} supplierModalId={supplierModalId} setSupplierModalId={setSupplierModalId} data={supplierData}/>
      </div>
  )
}
  
export default Suppliers