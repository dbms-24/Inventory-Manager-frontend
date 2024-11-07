import { useEffect, useState } from "react";
import { Modal, Container } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import Input from "./Input";
import DeleteIcon from '@mui/icons-material/Delete';
import Calendar from "./Calendar.jsx";
import { PhoneBluetoothSpeakerTwoTone } from "@mui/icons-material";
import DressTable from "../components/DressTable";
import Form from "../components/Form"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function SupplierDetails({supplierModalId, setSupplierModalId, supplierOpen, setSupplierOpen ,data}){
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addPhone, setAddPhone] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [reload, setReload] = useState(false);
  const [addEmail, setAddEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [supplierEmails, setSupplierEmail] = useState(null);
  const [supplierPhone, setSupplierPhone] = useState(null);
  const token = window.localStorage.getItem('token')
  const [dressData, setDressData] = useState(null);
  const [dressId,setDressId] = useState(0);
  const [formOpen,setFormOpen] = useState(false);


  const fields = [
    {
      name:"supplier_id",
      type:"number",
      placeholder:"Supplier Id",
      initialValue:""
    },
    {
      name:"dress_id",
      type:"number",
      placeholder:"Dress Id",
      initialValue:""
    },
    {
      name:"quality",
      type:"number",
      placeholder:"Quality",
      initialValue:""
    },
    {
      name:"number_of_times_bought",
      type:"number",
      placeholder:"Number Of Times Bought",
      initialValue:""
    }
   ]


  const supplierDetails = data?.filter((supplier)=>{
    return (supplier.id == supplierModalId);
  })

  useEffect(()=>{
    if(supplierModalId){
    setLoading(true);
   axios.get(`http://localhost:8080/supplier/${supplierModalId}/active_dress`,{
    'headers' : {
      'Authorization' : token,
      'Content-Type' : 'application/json'
    }
   })
  .then((res)=>{
      setDressData(res.data);
      setLoading(false);
    })
  .catch((err)=>{
    setLoading(false);
    console.log(err);
    })
  }
},[supplierOpen, reload]);

  // Email
  useEffect(()=>{
    if(supplierModalId){
    setLoading(true);
   axios.get(`http://localhost:8080/supplier/${supplierModalId}/email`,{
    'headers' : {
      'Authorization' : token,
      'Content-Type' : 'application/json'
    }
   })
  .then((res)=>{
      setSupplierEmail(res.data);
      setLoading(false);
    })
  .catch((err)=>{
    setLoading(false);
    console.log(err);
    })
  }
},[supplierOpen, reload]);

// Phone
useEffect(()=>{
  if(supplierModalId){
  setLoading(true);
 axios.get(`http://localhost:8080/supplier/${supplierModalId}/phone`,{
  'headers' : {
    'Authorization' : token,
    'Content-Type' : 'application/json'
  }
 })
.then((res)=>{
    setSupplierPhone(res.data);
    setLoading(false);
  })
.catch((err)=>{
  setLoading(false);
  console.log(err);
  })
}
},[supplierOpen, reload]);


    function handleAddPhoneNumber(){
        axios.post(`http://localhost:8080/supplier/${supplierModalId}/phone`,
        {
          supplier_id: supplierModalId,
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
        axios.delete(`http://localhost:8080/supplier/${supplierModalId}/phone/${phone.id}`,{
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
      axios.post(`http://localhost:8080/supplier/${supplierModalId}/email`,
      {
        supplier_id: supplierModalId,
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
      axios.delete(`http://localhost:8080/supplier/${supplierModalId}/email/${email.id}`,{
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
      axios.delete(`http://localhost:8080/supplier/${supplierModalId}`,{
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
      setSupplierOpen(false);
      setSupplierModalId(null);

    }

    function handleDressList(){
      setFormOpen(true);
    }


    function handleAddActiveDress(){
      
      axios.post(`http://localhost:8080/supplier/${supplierModalId}/active_dress/${dressId}`,
        {
          supplier_id: supplierModalId,
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
          setDressId(0);
          console.log(dressId);
          setReload(!reload);
        })
        .catch((err)=>{
          console.log(err);
        })
    }

    function handleDeleteActiveDress(data){
      axios.delete(`http://localhost:8080/supplier/${supplierModalId}/active_dress/${data.dress_id}`,{
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

  return (
    <Modal open={supplierOpen} onClose={handleOnclose}>
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
                (!loading && supplierDetails) ? 
                <div>
                  <div className="text-center font-heading font-medium text-3xl text-black">{supplierDetails[0]?.name}</div>
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
                      {(supplierPhone && supplierPhone?.length == 0) && 
                        <div className="font-normal text-gray-500">No Phone Nos. present</div>
                        }
                      {
                        (supplierPhone && supplierPhone?.length!=0) &&
                        supplierPhone.map((phone)=>{
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
                      {(supplierEmails && supplierEmails?.length == 0) && 
                        <div className="font-normal text-gray-500">No Emails present</div>
                        }
                      {(supplierEmails && supplierEmails?.length != 0) && 
                        supplierEmails.map((email)=>{
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
                      <div className="text-xl col-span-2 text-center font-normal text-gray-500">
                            <span className="font-heading text-black mr-4">Address</span>
                            {supplierDetails[0]?.address}
                      </div>
                  </div>

                  <DressTable formOpen={formOpen} setFormOpen={setFormOpen} dressId={dressId} setDressId={setDressId} />

                  <div className="grid grid-cols-2 gap-8 text-xl font-normal text-gray-500 my-3">
                  <div className="flex flex-col justify-center">
                  <div className="text-center font-normal text-black">If you want to add dress to active dress collection refer to Dress List</div>
                  </div>
                  <div className="flex flex-col justify-center">
                  <div className="flex justify-end">
                  <div className="border-2 border-green-500 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:border-green-400 hover:shadow-lg cursor-pointer px-2 py-1 flex items-center justify-center ml-2 mr-4" onClick={handleDressList}>Dress List</div>
                  </div>
                  </div>
                  </div>
                  <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                          <TableRow>
                          <TableCell> (ID)</TableCell>
                          <TableCell align="right">Supplier ID</TableCell>
                          <TableCell align="right">Dress ID</TableCell>
                          <TableCell align="right">Quality</TableCell>
                          <TableCell align="right">Number Of Times Bought</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {dressData && dressData.map((data) => (
                          <TableRow
                              key={data.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                              <TableCell component="th" scope="row">
                              {data.id}
                              </TableCell>
                              <TableCell align="right">{data.supplier_id}</TableCell>
                              <TableCell align="right">{data.dress_id}</TableCell>
                              <TableCell align="right">{data.quality}</TableCell>
                              <TableCell align="right">{data.number_of_times_bought}</TableCell>
                              <div className="cursor-pointer" onClick={()=>{handleDeleteActiveDress(data)}}>
                                <DeleteIcon className="text-red-600" /> 
                              </div>
                          </TableRow>
                          ))}
                      </TableBody>
                      </Table>
                  </TableContainer>
                  {
                    (dressId>0) ?
                    
                    <div className="flex flex justify-center mt-4">
                    <div className="border-2 border-green-500 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:border-green-400 hover:shadow-lg cursor-pointer px-4 py-2 flex items-center justify-center ml-2 mr-4 text-green-500" onClick={handleAddActiveDress} > Add Active Dress</div>
                    </div>
                    :
                    <div className="flex flex justify-center mt-4 font-normal text-xl">
                      <div>Please select a Dress first to Add</div>
                    </div>

                  }
                  <div className="flex flex justify-center mt-4">
                  <div className="border-2 border-red-500 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:border-red-400 hover:shadow-lg cursor-pointer px-4 py-2 flex items-center justify-center ml-2 mr-4 text-red-500" onClick={handleDelete} > DELETE </div>
                  </div>
                </div> :
                <div className="text-center text-black font-heading text-2xl">
                  Oops supplier data not found !
                </div>
              }
              </Container>
          </div>
    </Modal>
  )


}
export default SupplierDetails;