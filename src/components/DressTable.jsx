import { Button, Container, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Input from "./Input";
import axios from "axios";
import Get from "../components/useGet";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function DressTable({formOpen, setFormOpen ,dressId ,setDressId}) {
    const dresses = Get(`http://localhost:8080/dresses`);

    function handleDressId(data){
        setDressId(data.id);
    }

    return (
        <>
        <Modal open={formOpen} onClose={()=>setFormOpen(false)} className="focus:outline-none">
            <div className="flex flex-col justify-center h-screen">
                <div className="flex justify-center">
                <div className="bg-secondary-300 rounded-lg text-background m-10 border-2 w-1/2 px-4 pb-6">
                    <div className="flex justify-end cursor-pointer">
                        <CloseIcon 
                        sx={{ color: 'red', cursor: 'pointer', fontSize: 30 }}
                        color="font-bold text-xl mt-2" onClick={()=>setFormOpen(false)} />
                    </div>
                    <div className="py-8 text-center font-heading text-3xl text-primary-800">Dresses</div>
                    {
                        dressId>0 ?
                        <div className="flex justify-center font-normal">
                            <div>A Dress is selected now you can close the tab</div>
                        </div>
                        :
                        <div className="flex justify-center font-normal">
                            <div>select a Dress</div>
                        </div>

                    }
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                            <TableCell> (ID)</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Brand</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Size</TableCell>
                            <TableCell align="right">Colour</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dresses && dresses.map((data) => (
                            <TableRow
                                key={data.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={()=>handleDressId(data)}
                                selected ={true}
                                >
                                <TableCell component="th" scope="row">
                                {data.id}
                                </TableCell>
                                <TableCell align="right">{data.name}</TableCell>
                                <TableCell align="right">{data.brand}</TableCell>
                                <TableCell align="right">{data.gender}</TableCell>
                                <TableCell align="right">{data.size}</TableCell>
                                <TableCell align="right">{data.color}</TableCell>
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
};