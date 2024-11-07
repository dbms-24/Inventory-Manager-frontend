import UserCard from "../components/UserCard";
import AdminCard from "../components/AdminCard";
import Form from "../components/Form"
import Get from "../components/useGet"
import { useEffect, useState } from "react"

function Admin() {
    const [open, setOpen] = useState(false);
    const Data = Get("http://localhost:8080/admin/get_users");

    const userData = Data?.filter((user)=>{
      return (user.role == "USER");
    })
    const adminData = Data?.filter((admin)=>{
      return (admin.role == "ADMIN");
    })
    const fields = [
      {
        name:"phone_number",
        type:"text",
        placeholder:"Phone Number",
        initialValue:""
      },
      {
        name:"password",
        type:"text",
        placeholder:"Password",
        initialValue:""
      },
      {
        name:"name",
        type:"text",
        placeholder:"Name",
        initialValue:""
      }
     ]

    return (
      <div className="min-h-screen">
        <Form open={open} setOpen={setOpen} heading={"Add an User"} method={"POST"} url={'http://localhost:8080/admin/add_user'} submitText={"Submit"} fields={fields}/>

        {/* Admins */}
        <div className={"flex justify-between px-10"}>
          <div className="flex flex-col justify-center font-heading text-2xl font-bold my-4">
            <div>
              Admins
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-7 mx-10 my-10 cursor-pointer">
        {
          adminData && adminData.map((data)=>{
          return (
                  <div>
                    <AdminCard adminDetails={data} />
                  </div>
                  )
        })
        }
        </div>

        {/* Users */}

        <div className={"flex justify-between px-10"}>
          <div className="flex flex-col justify-center font-heading text-2xl font-bold my-4">
            <div>
            Users
          </div>
          </div>
        <div className="bg-primary-400 font-normal rounded-lg my-4 px-3 py-2 cursor-pointer" onClick={()=>setOpen(true)}>Add User</div>
        </div>

        <div className="grid grid-cols-4 gap-7 mx-10 my-10 cursor-pointer">
        { 
          userData && userData.map((data)=>{  
          return (
                  <div>
                    <UserCard userDetails={data} />
                  </div>
                  )
        })
        }
        </div>

        
      </div>
    )
  }
  
  export default Admin
