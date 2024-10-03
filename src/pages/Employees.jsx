import Form from "../components/Form"
import Get from "../components/Get"
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
  const data = Get('http://localhost:8080/employee');
  console.log(data);
    return (
      <div>
        <Button onClick={()=>setOpen(true)}>Open Modal</Button>
        <Form open={open} setOpen={setOpen} heading={"NEW JOIN"} method={"POST"} url={'http://localhost:8080/employee'} submitText={"Submit"} fields={fields}/>
        Employee Page
      </div>
    )
  }

  export default Employee