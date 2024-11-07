import { Button, Container, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Input from "./Input";
import axios from "axios";
import Get from "./useGet";
import CustomersStock from "./CustomersStock";

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
    const customerTransactions = Get(`http://localhost:8080/transaction/customer`)
    
    function handleOpen(Data){
        setOpen(true);
        setTransactionsId(Data.id);
      }
    
    return (
        <div className="flex justify-center">

            <CustomersStock open={open} setOpen={setOpen} transactionsId={transactionsId} setTransactionsId={setTransactionsId} data={customerTransactions} />
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
    )
}