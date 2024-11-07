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
import UpdateActiveDress from './UpdateActiveDress'
function SelectActiveDressData({activeDressData, setActiveDressData, currSupplierData}) {
    const [loading, setLoading] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
    
    useEffect(()=>{
      const token = window.localStorage.getItem('token');
      axios.get(`http://localhost:8080/supplier/${currSupplierData?.id}/active_dress`,{
            'headers' : {
                  'Authorization' : token,
                        'Content-Type' : 'application/json'
              }
      }).
      then((res)=>{
      const newData = res.data.map((obj)=>{
        return {
          'dress_id':obj.dress_id,
            'available_quantity' : 0,
            "purchase_date": null,
            "selling_price": 0,
            "purchase_price": 0,
            "damaged_quantity":0,
            "quality": 0,
            "old_quality":obj.quality,
            "number_of_times_bought" : obj.number_of_times_bought,
            "selected" : false
          }
      });
      setActiveDressData(newData);
      setLoading(false);
      })
      .catch((err)=>{
        console.log(err)
        setLoading(false);
      })
    }, [])

    function handleCheckMark(row){
       const updatedData = activeDressData.map((data)=>{
          if(data.id == row.id){
            return {
              ...row,
              'selected' : !row.selected
            }
          }else {
            return data;
          }
        })
        setActiveDressData(updatedData)
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
      <UpdateActiveDress updateOpen={updateOpen} setUpdateOpen={setUpdateOpen} setActiveDressData={setActiveDressData} activeDressData={activeDressData} role={selectedRow} />
      </div>
      { activeDressData  && 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
           <TableCell></TableCell>
            <TableCell>Id</TableCell>
            <TableCell align="right">Quality</TableCell>
            <TableCell align="right">Number of times Bought</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activeDressData.map((row) => (
            <TableRow
              onClick={()=>handleCheckMark(row)}
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
                {row.dress_id}
              </TableCell>
            <TableCell align="center">{row.old_quality}</TableCell>
            <TableCell align="center">{row.number_of_times_bought}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      }
      </div>
    )
  }
  
  export default SelectActiveDressData;
