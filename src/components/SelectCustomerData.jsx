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

function SelectCustomerData({currCustomer, setCurrentCustomer}) {
    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
      const token = window.localStorage.getItem('token');
      axios.get('http://localhost:8080/customer',{
            'headers' : {
                  'Authorization' : token,
                        'Content-Type' : 'application/json'
              }
      }).
      then((res)=>{
        setCustomerData(res.data);
      setLoading(false);
      })
      .catch((err)=>{
        console.log(err);
        setLoading(false);
      })
    }, [])
    function handleOnClick(data){
      console.log('Clicked', data)
      setCurrentCustomer(data);
    }
    if(loading){
      return <div className="font-heading animate-pulse text-3xl">Loading ...</div>
    }
    return (
      <div>
       <div className="py-8 text-center font-heading text-3xl text-primary-800">Customer Details</div>
      <div className="text-center text-gray-500 font-normal mb-3">
      {
        (currCustomer) ? <div>(The selected customer is {currCustomer?.name} and id {currCustomer?.id})</div>
        : <div>(Please select a customer)</div>
      }
      </div>
      { customerData && 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>(Id)</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customerData.map((row) => (
            <TableRow
              onClick={()=>handleOnClick(row)}
              selected={true}
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.phone_number}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      }
      </div>
    )
  }
  
  export default SelectCustomerData;
