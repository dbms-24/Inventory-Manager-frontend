import { Button, Container, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Input from "./Input";
import axios from "axios";
import Get from "./useGet";
import SuppliersStock from "./SuppliersStock";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function SuppliersTransactionDetails() {

    const [open,setOpen] = useState(false);
    const [transactionsId,setTransactionsId] = useState(null);
    const supplierTransactions = Get(`http://localhost:8080/transaction/supplier`)
    
    function handleOpen(Data){
        setOpen(true);
        setTransactionsId(Data.id);
      }
    
    return (
        <div className="flex justify-center">
            <SuppliersStock open={open} setOpen={setOpen} transactionsId={transactionsId} setTransactionsId={setTransactionsId} data={supplierTransactions} />
          <div className='w-3/4'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                    <TableCell> (ID)</TableCell>
                    <TableCell align="right">Supplier ID</TableCell>
                    <TableCell align="right">Transaction Date</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {supplierTransactions && supplierTransactions?.map((Data) => (
                    <TableRow
                        key={Data.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        onClick={()=>handleOpen(Data)}
                        selected={true}
                    >
                        <TableCell component="th" scope="row">
                        {Data.id}
                        </TableCell>
                        <TableCell align="right">{Data.supplier_id}</TableCell>
                        <TableCell align="right">{Data.transaction_date}</TableCell>
                        <TableCell align="right">{Data.amount}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
          </div> 
        </div>
    )
}
