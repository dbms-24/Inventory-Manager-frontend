import axios from "axios";
import { useEffect, useState } from "react";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import UpdateInventory from './UpdateInventory'
function SelectInventoryData({inventoryData, setInventoryData}) {
    const [loading, setLoading] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
    
    useEffect(()=>{
      const token = window.localStorage.getItem('token');
      axios.get('http://localhost:8080/dresses/stock',{
            'headers' : {
                  'Authorization' : token,
                        'Content-Type' : 'application/json'
              }
      }).
      then((res)=>{
      const newData = res.data.map((obj)=>{
        return {
          ...obj,
          'new_required_quantity' : 0,
          'new_damaged_quantity' : 0,
          'selected' : false
        }
      });
      setInventoryData(newData);
      setLoading(false);
      })
      .catch((err)=>{
        console.log(err)
        setLoading(false);
      })
    }, [])

    function handleCheckMark(row){
       const updatedData = inventoryData.map((data)=>{
          if(data.id == row.id){
            return {
              ...row,
              'selected' : !row.selected
            }
          }else {
            return data;
          }
        })
        setInventoryData(updatedData)
        if(row.selected == false){
          setSelectedRow(row);
          setUpdateOpen(true);
        }
    }

    if(loading){
      return <div className="font-heading animate-pulse text-3xl">Loading ...</div>
    }
    return (
      <div>
       <div className="py-8 text-center font-heading text-3xl text-primary-800">Inventory Details</div>
      <div className="text-center text-gray-500 font-normal mb-3">
      <UpdateInventory updateOpen={updateOpen} setUpdateOpen={setUpdateOpen} setInventoryData={setInventoryData} inventoryData={inventoryData} role={selectedRow} />
      </div>
      { inventoryData  && 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
           <TableCell></TableCell>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">AvailableQuantity</TableCell>
            <TableCell align="right">DamagedQuantity</TableCell>
            <TableCell align="right">PurchaseDate</TableCell>
            <TableCell align="right">PurchasePrice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventoryData.map((row) => (
            <TableRow
              onClick={()=>handleOnClick(row)}
              selected={true}
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             <TableCell component="th" scope="row" onClick={()=>handleCheckMark(row)}>
            {
              (row.selected == false) ? 
              <CheckBoxOutlineBlankIcon />
              : <CheckBoxIcon color="green" /> 
            } 
              </TableCell>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
            <TableCell align="center">{row.dressDetails.name}</TableCell>
            <TableCell align="center">{row.dressDetails.gender}</TableCell>
            <TableCell align="center">{row.dressDetails.brand}</TableCell>
            <TableCell align="center">{row.dressDetails.size}</TableCell>
            <TableCell align="center">{row.dressDetails.color}</TableCell>
            <TableCell align="center">{row.available_quantity}</TableCell>
            <TableCell align="center">{row.damaged_quantity}</TableCell>
            <TableCell align="center">{row.purchase_date}</TableCell>
            <TableCell align="center">{row.purchase_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      }
      </div>
    )
  }
  
  export default SelectInventoryData;
