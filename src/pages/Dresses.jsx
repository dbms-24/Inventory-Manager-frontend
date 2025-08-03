import DressCard from "../components/DressCard";
import DressDetails from "../components/DressDetails";
import { ThemeContext } from '../App'
import { useContext, useEffect, useState } from "react";
import Form from "../components/Form"
import Get from "../components/useGet"
function Dresses() {
  const [open, setOpen] = useState(false);
  const [dressOpen, setDressOpen] = useState(false);
  const [dressModalId, setDressModalId] = useState(null);
  const [dressEditOpen, setDressEditOpen] = useState(false);
  const [dressEditInitialValue, setDressEditInitialValue] = useState(null);
  const dressData = Get(`${import.meta.env.VITE_BACKEND_URL}/dresses`);
  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      initialValue: ""
    },
    {
      name: "brand",
      type: "text",
      placeholder: "Brand",
      initialValue: ""
    },
    {
      name: "gender",
      type: "text",
      placeholder: "Gender",
      initialValue: ""
    },
    {
      name: "size",
      type: "text",
      placeholder: "Size",
      initialValue: ""
    },
    {
      name: "color",
      type: "text",
      placeholder: "Color",
      initialValue: ""
    },
    {
      name: "required_quantity",
      type: "number",
      placeholder: "Required Quantity",
      initialValue: ""
    }
  ];


  console.log("dressData", dressData);
  return (
    <div className="min-h-screen">
      <Form open={open} setOpen={setOpen} heading={"Add a Dress"} method={"POST"} url={`${import.meta.env.VITE_BACKEND_URL}/dresses`} submitText={"Submit"} fields={fields} />
      <Form open={dressEditOpen} setOpen={setDressEditOpen} fields={fields} heading={`Edit ${dressEditInitialValue?.name} Details`} url={`${import.meta.env.VITE_BACKEND_URL}/dresses/${dressEditInitialValue?.id}`} submitText={"Edit Dress"} method={"PUT"} initialFieldsData={dressEditInitialValue} />
      <div className={"flex justify-between px-10"}>
        <div className="flex flex-col justify-center font-heading text-2xl font-bold my-4">
          <div>
            Dress Details
          </div>
        </div>
        <div className="bg-primary-400 font-normal rounded-lg my-4 px-3 py-2 cursor-pointer" onClick={() => setOpen(true)}>Add Dress</div>
      </div>
      <div className="grid grid-cols-4 gap-7 mx-10 my-10 cursor-pointer">

        {
          dressData && dressData.map((data) => {
            return (
              <div>
                <DressCard dressData={data} setDressOpen={setDressOpen} setDressModalId={setDressModalId} setDressEditOpen={setDressEditOpen} setDressEditInitialValue={setDressEditInitialValue} />
              </div>
            )
          })
        }
      </div>
      <div>
        <DressDetails dressOpen={dressOpen} setDressOpen={setDressOpen} dressModalId={dressModalId} setDressModalId={setDressModalId} />
      </div>
    </div>
  )
}

export default Dresses;
