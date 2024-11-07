import { Button, Container, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Input from "./Input";
import axios from "axios";
import Get from "./useGet";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function CustomersTransactionDetails() {

    const [open,setOpen] = useState(false);
    const [transactionsId,setTransactionsId] = useState(null);
    const [customerTransactions,setCustomerTransactions] = useState(null);


    const stock = data?.filter((stock)=>{
        return (stock.id == transactionId);
      })


    useEffect(()=>{
    if(customerModalId){
        axios.get(`http://localhost:8080/transaction/customer`,{
        'headers' : {
            'Authorization' : token,
            'Content-Type' : 'application/json'
        }
        })
        .then((res)=>{
        setCustomerTransactions(res.data);
        console.log(res);
        })
        .catch((err)=>{
        console.log(err)
        })
    }
    },[])
    
    function handleOpen(Data){
        setOpen(true);
        setTransactionsId(Data.id);
      }
    
    return (
        <>
        <Modal open={open} onClose={()=>setOpen(false)} className="focus:outline-none">
            <div className="flex flex-col justify-center h-screen">
                <div className="flex justify-center">
                <div className="bg-secondary-300 rounded-lg text-background m-10 border-2 w-1/2 px-4 pb-6">
                    <div className="flex justify-end cursor-pointer">
                        <CloseIcon 
                        sx={{ color: 'red', cursor: 'pointer', fontSize: 30 }}
                        color="font-bold text-xl mt-2" onClick={handleClose} />
                    </div>
                    <div className="py-8 text-center font-heading text-3xl text-primary-800">Stock</div>

                    <CustomerTransactionStock open={open} setOpen={setOpen} transactionsId={transactionsId} setTransactionsId={setTransactionsId} data={customerTransactions} />
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                          <TableRow>
                          <TableCell> (ID)</TableCell>
                          <TableCell align="right">Customer ID</TableCell>
                          <TableCell align="right">Transaction Date</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {customerTransactions && customerTransactions?.map((Data) => (
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
                          </TableRow>
                          ))}
                      </TableBody>
                      </Table>
                  </TableContainer>
                    
                </div>
                </div>
            </div>
        </Modal>
        </>
    )
}