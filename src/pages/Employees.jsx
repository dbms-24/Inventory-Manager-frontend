import Form from "../components/Form"
import { useState } from "react";
import { Button } from "@mui/material";
function Employee() {
  const [open, setOpen] = useState(false);
  // {open, setOpen, heading, onSubmit, submitText, fields}
  // Fields syntax
  // {
  //  name:"String" // Must be unique and case semsitive
  //  type:"String" // text, email, password
  //  placeholder:"String"
  //  initialValue 
  // }
  const fields = [
    {
      name:"name",
      type:"text",
      placeholder:"Name",
      initialValue:""
    },
    {
      name:"email",
      type:"email",
      placeholder:"Email",
      initialValue:""
    },
    {
      name:"password",
      type:"password",
      placeholder:"Password",
      initialValue:""
    }
  ]
    return (
      <div>
        <Button onClick={()=>setOpen(true)}>Open Modal</Button>
        <Form open={open} setOpen={setOpen} heading={"Heading"} method={"POST"} url={"EndPoint-1"} submitText={"Submit"} fields={fields}/>
        Employee Page
      </div>
    )
  }
  
  export default Employee