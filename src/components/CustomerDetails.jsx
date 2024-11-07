import { useEffect, useState } from "react";
import { Modal, Container } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import Input from "./Input";
import DeleteIcon from '@mui/icons-material/Delete';
import CustomerTransactionStock from "../components/CustomerTransactionStock";
import Get from "../components/useGet";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function CustomerDetails({customerModalId, setCustomerModalId, customerOpen, setCustomerOpen, data}){
  const [loading, setLoading] = useState(false);
  const [open,setOpen] = useState(false);
  const [transactionId,setTransactionId] = useState(null);
  const [customerTransactionData,setCustomerTransactionData] = useState(null);
  const customerData = data?.filter((customer)=>{
    return (customer.id == customerModalId);
  })
  const token = window.localStorage.getItem('token')
  useEffect(()=>{
    if(customerModalId){
      axios.get(`http://localhost:8080/transaction/customer/${customerModalId}`,{
        'headers' : {
          'Authorization' : token,
          'Content-Type' : 'application/json'
        }
      })
      .then((res)=>{
        setCustomerTransactionData(res.data);
        console.log(res);
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },[])


  function handleOpen(Data){
    setOpen(true);
    setTransactionId(Data.id)
  }

  function handleOnclose(){
    setCustomerOpen(false);
    setCustomerModalId(null);
  }

  function handleDeleteRow(Data){
    if(customerModalId){
    axios.delete(`http://localhost:8080/transaction/${Data.id}/customer/${customerModalId}`,{
      'headers' : {
        'Authorization' : token,
        'Content-Type' : 'application/json'
      }
    })
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  }

  function handleDeleteAll(){
    if(customerModalId){
    axios.delete(`http://localhost:8080/transaction/customer/${customerModalId}`,{
      'headers' : {
        'Authorization' : token,
        'Content-Type' : 'application/json'
      }
    })
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err)
    })
    }
  }

  function handleDelete(){
      if(customerModalId){
        axios.delete(`http://localhost:8080/customer/${customerModalId}`,{
          'headers' : {
            'Authorization' : token,
            'Content-Type' : 'application/json'
          }
        })
        .then((res)=>{
          window.location.reload();
        })
        .catch((err)=>{
          console.log(err)
        })
      }
  
  }

  return (
    <Modal open={customerOpen} onClose={handleOnclose}>
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
                    (!loading && customerData?.length>0) ? 
                    <div>
                        <div className="text-center font-heading font-medium text-3xl text-black">{customerData[0]?.name}</div>
                        <div className="text-center font-normal text-xl text-gray-500">{customerData[0]?.points} Points</div>
                        <div className="grid grid-cols-2 gap-8 text-center py-4">
                            <div className="flex flex-col mt-2">
                                <div className="text-xl font-heading text-black">Phone Number:</div>
                                <div className="text-xl font-normal text-gray-500">{customerData[0]?.phone_number}</div>
                            </div>
                            <div className="flex flex-col mt-2">
                                <div className="text-xl font-heading text-black">Email:</div>
                                <div className="text-xl font-normal text-gray-500">{customerData[0]?.email}</div>
                            </div>
                            <div className="text-xl col-span-2 text-center font-normal text-gray-500">
                              <span className="font-heading text-black mr-4">Address</span>
                              {customerData[0]?.address}
                            </div>
                        </div>
                    </div>
                    :
                    <div className="text-center text-black font-heading text-2xl">
                    Oops Employee data not found !
                    </div>
                }
                <CustomerTransactionStock open={open} setOpen={setOpen} transactionId={transactionId} setTransactionId={setTransactionId} data={customerTransactionData} />
                <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                          <TableRow>
                          <TableCell> (ID)</TableCell>
                          <TableCell align="right">Customer ID</TableCell>
                          <TableCell align="right">Transaction Date</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          <div className="cursor-pointer" onClick={()=>{handleDeleteAll()}}>
                            <DeleteIcon className="text-red-600" /> 
                          </div>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {customerTransactionData && customerTransactionData?.map((Data) => (
                          <TableRow
                              key={Data.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              onClick={handleOpen(Data)} 
                          >
                              <TableCell component="th" scope="row">
                              {Data.id}
                              </TableCell>
                              <TableCell align="right">{Data.customer_id}</TableCell>
                              <TableCell align="right">{Data.transaction_date}</TableCell>
                              <TableCell align="right">{Data.amount}</TableCell>
                              <div className="cursor-pointer" onClick={()=>{handleDeleteRow(Data)}}>
                                <DeleteIcon className="text-red-600" /> 
                              </div>
                          </TableRow>
                          ))}
                      </TableBody>
                      </Table>
                  </TableContainer>
                  {
                    customerTransactionData && customerTransactionData?.length>0 ?
                    <div className="flex justify-center">
                      <div className="font-normal text-xl">
                        Cannot Delete Customer
                      </div>
                    </div>
                    :
                    <div className="flex flex justify-center mt-4">
                    <div className="border-2 border-red-500 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:border-red-400 hover:shadow-lg cursor-pointer px-4 py-2 flex items-center justify-center ml-2 mr-4 text-red-500" onClick={handleDelete} > DELETE </div>
                    </div>
                  }

            </Container>
        </div>
    </Modal>
  )
}
export default CustomerDetails