import { useEffect, useState } from "react";
import { Modal, Container } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import Input from "./Input";
import DeleteIcon from '@mui/icons-material/Delete';
import Calendar from "./Calendar.jsx";
function EmployeeDetails({employeeModalId, setEmployeeModalId, employeeOpen, setEmployeeOpen}) {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addPhone, setAddPhone] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [reload, setReload] = useState(false);
  const [addEmail, setAddEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const token = window.localStorage.getItem('token')

  useEffect(()=>{
    if(employeeModalId){
      setLoading(true);
     axios.get(`http://localhost:8080/employee/${employeeModalId}`,{
      'headers' : {
        'Authorization' : token,
        'Content-Type' : 'application/json'
      }
     })
    .then((res)=>{
        setEmployeeDetails(res.data);
        setLoading(false);
      })
    .catch((err)=>{
      setLoading(false);
      console.log(err);
      })
    }
  },[employeeOpen, reload]);

  
  
    function handleAddPhoneNumber(){
        axios.post(`http://localhost:8080/employee/${employeeModalId}/phone`,
        {
          employee_id: employeeModalId,
          phone : newPhone
        },
        {
          'headers' : {
            'Authorization' : token,
            'Content-Type' : 'application/json'
          }
        })
        .then((res)=>{
          console.log(res);
          setReload(!reload);
          setAddPhone(false);
          setNewPhone("");
        })
        .catch((err)=>{
        setAddPhone(false);
        setNewPhone("");
          console.log(err);
        })
    }
    function handleDeletePhone(phone){
        axios.delete(`http://localhost:8080/employee/${employeeModalId}/phone/${phone.id}`,{
          'headers' : {
            'Authorization' : token,
            'Content-Type' : 'application/json'
          }
        })
        .then((res)=>{
        console.log(res);
        setReload(!reload);
        })
        .catch((err)=>{
          setReload(!reload);
          console.log(err)
        })

    }

    function handleAddEmail(){
      axios.post(`http://localhost:8080/employee/${employeeModalId}/email`,
      {
        employee_id: employeeModalId,
        email : newEmail
      },
      {
        'headers' : {
          'Authorization' : token,
          'Content-Type' : 'application/json'
        }
      }
    )
      .then((res)=>{
        console.log(res);
        setReload(!reload);
        setAddEmail(false);
        setNewEmail("");
      })
      .catch((err)=>{
      setAddEmail(false);
      setNewEmail("");
        console.log(err);
      })
  }
  function handleDeleteEmail(email){
      axios.delete(`http://localhost:8080/employee/${employeeModalId}/email/${email.id}`,{
        'headers' : {
          'Authorization' : token,
          'Content-Type' : 'application/json'
        }
      })
      .then((res)=>{
        console.log(res);
        setReload(!reload);
      })
      .catch((err)=>{
        setReload(!reload);
        console.log(err)
      })
  }
    function handleDelete(){
      axios.delete(`http://localhost:8080/employee/${employeeModalId}`,{
        'headers' : {
          'Authorization' : token,
          'Content-Type' : 'application/json'
        }
      })
      .then((res)=>{
        window.location.reload();
      })
      .catch((err)=>{
        setReload(!reload);
        console.log(err)
      })
    }
    function handleOnclose(){
      setEmployeeOpen(false);
      setEmployeeModalId(null);

    }
    return (
      <Modal open={employeeOpen} onClose={handleOnclose}>
            <div className="flex flex-col justify-center h-screen">
                <Container className="bg-secondary-300 rounded-lg text-background m-10 border-2 pt-4 pb-6">
                    <div className="flex justify-end cursor-pointer">
                        <CloseIcon 
                        sx={{ color: 'red', cursor: 'pointer', fontSize: 30 }}
                        color="font-bold text-xl mt-2" onClick={handleOnclose} />
                    </div>
                {
                  loading && <div className="text-center text-black font-heading text-2xl animate-pulse">Loading ...</div>
                }
                {
                  (!loading && employeeDetails) ? 
                  <div>
                    <div className="text-center font-heading font-medium text-3xl text-black">{employeeDetails.employeeDetails.name}</div>
                    <div className="text-center font-normal text-xl text-gray-500">{employeeDetails.employeeDetails.role}</div>
                    <div className="grid grid-cols-2 gap-8 text-center py-4">
                      <div className="flex flex-col mt-2">
                        <div className="text-black font-heading text-xl flex justify-around mb-3">
                          <div>Phone No.s</div>
                          <div onClick={()=>setAddPhone(!addPhone)}>
                            {
                              addPhone ?
                            <CloseIcon className="text-red-500 cursor-pointer font-bold" />:
                            <AddIcon className="text-green-500 cursor-pointer font-bold" />
                            }
                          </div>
                        </div>
                        {(employeeDetails.phones.length == 0) && 
                          <div className="font-normal text-gray-500">No Phone Nos. present</div>
                          }
                        {
                          (employeeDetails.phones.length!=0) &&
                          employeeDetails.phones.map((phone)=>{
                            return (<div key={phone.id} className="font-normal text-xl flex justify-around">
                                    <div>{phone.phone}</div>
                                    <div className="cursor-pointer" onClick={()=>{handleDeletePhone(phone)}}>
                                   <DeleteIcon className="text-red-600" /> 
                                    </div>
                                </div>)
                          })
                        }
                        {
                          addPhone && 
                          (
                          <>
                          <Input type={"string"} placeholder={"Phone Number"} name={""} value={newPhone} onChange={(e)=>setNewPhone(e.target.value)} />
                         <div className="flex justify-center">
                          <span className="px-3 py-2 mt-4 rounded-lg border-2 border-primary-500 text-black font-heading cursor-pointer" onClick={handleAddPhoneNumber}>Add Phone Number</span>
                        </div>
                         </>
                          )
                        }
                      </div>
                      <div className="flex flex-col mt-2">
                        <div className="text-black font-heading text-xl flex justify-around mb-3">
                          <div>Emails</div>
                          <div onClick={()=>setAddEmail(!addEmail)}>
                            {
                              addEmail ?
                            <CloseIcon className="text-red-500 cursor-pointer font-bold" />:
                            <AddIcon className="text-green-500 cursor-pointer font-bold" />
                            }
                          </div>
                        </div>
                        {(employeeDetails.emails.length == 0) && 
                          <div className="font-normal text-gray-500">No Emails present</div>
                          }
                        {(employeeDetails.emails.length != 0) && 
                          employeeDetails.emails.map((email)=>{
                            return (<div key={email.id} className="font-normal text-xl flex justify-around">
                                    <div>{email.email}</div>
                                    <div className="cursor-pointer" onClick={()=>{handleDeleteEmail(email)}}>
                                   <DeleteIcon className="text-red-600" /> 
                                    </div>
                                </div>)
                          })
                        }
                        {
                          addEmail && 
                          (
                          <>
                          <Input type={"string"} placeholder={"Email"} name={""} value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} />
                         <div className="flex justify-center">
                          <span className="px-3 py-2 mt-4 rounded-lg border-2 border-primary-500 text-black font-heading cursor-pointer" onClick={handleAddEmail}>Add Email</span>
                        </div>
                         </>
                          )
                        }
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 text-xl font-normal text-gray-500">
                        <div className="flex justify-around">
                          <span className="font-heading text-black">Salary</span> 
                          <div>{employeeDetails.employeeDetails.salary}</div>
                        </div>
                        <div className="flex justify-around">
                          <span className="font-heading text-black">Join Date</span>
                          <div>{employeeDetails.employeeDetails.join_date}</div> 
                        </div>
                        <div className="text-xl col-span-2 text-center font-normal text-gray-500">
                              <span className="font-heading text-black mr-4">Address</span>
                              {employeeDetails.employeeDetails.address}
                        </div>
                    </div>
                    <Calendar />
                    <div className="flex flex justify-center">
                    <div className="border-2 border-red-500 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:border-red-400 hover:shadow-lg cursor-pointer px-4 py-2 flex items-center justify-center ml-2 mr-4 text-red-500" onClick={handleDelete} > DELETE </div>
                    </div>
                  </div> :
                  <div className="text-center text-black font-heading text-2xl">
                    Oops Employee data not found !
                  </div>
                }
                </Container>
            </div>
      </Modal>
    )
  }
  
  export default EmployeeDetails;
