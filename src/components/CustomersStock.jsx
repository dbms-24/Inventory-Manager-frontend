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


export default function CustomersStock({open, setOpen , transactionsId, setTransactionsId, data}) {

    const stock = data?.filter((stock)=>{
        return (stock.id == transactionsId);
      })
      console.log(stock)
    function handleClose(){
        setTransactionsId(null);
        setOpen(false);
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

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                            <TableCell> (ID)</TableCell>
                            <TableCell align="right">Dress Id</TableCell>
                            <TableCell align="right">Available Quantity</TableCell>
                            <TableCell align="right">Purchase Date</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Purchase Price</TableCell>
                            <TableCell align="right">Selling Price</TableCell>
                            <TableCell align="right">Damaged Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stock && stock[0] && stock[0].stockDressDescription?.map((data) => (
                            <TableRow
                                key={data.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={()=>handleDressId(data)}
                                selected ={true}
                                >
                                <TableCell component="th" scope="row">
                                {data.id}
                                </TableCell>
                                <TableCell align="right">{data.dress_id}</TableCell>
                                <TableCell align="right">{data.available_quantity}</TableCell>
                                <TableCell align="right">{data.purchase_date}</TableCell>
                                <TableCell align="right">{data.quantity}</TableCell>
                                <TableCell align="right">{data.purchase_price}</TableCell>
                                <TableCell align="right">{data.selling_price}</TableCell>
                                <TableCell align="right">{data.damaged_quantity}</TableCell>
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
