import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from './Input';
import axios from 'axios';


function Bill({currCustomer, invenetoryData, handleNext}) {
    function findValue(val1, val2){
        let value = 0;
        if(val1) value += parseInt(val1);
        if(val2) value += parseInt(val2);
        return value;
      }
    const [finalBill, setFinalBill] = React.useState(0);
    const [points, setPoints] = React.useState(0);
    let totalBill = 0;

    const billData = invenetoryData.filter((data)=>{
      if(data.selected == true){
        totalBill+=findValue(data.new_required_quantity, data.new_damaged_quantity)*findValue(0, data.selling_price);
      }
      return (data.selected == true);
    })

    async function handleOnClick(){
        const desc = invenetoryData.map((data)=>{
          return {
            ...data,
            'available_quantity' : data.new_required_quantity,
            'damaged_quantity' : data.new_damaged_quantity,
          }
        })
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
       const finalBillData = {
        'customer_id' : currCustomer.id,
        'transaction_date' : formattedDate,
        'amount' : finalBill,
        'StockDescription': desc
        } 
        const token = window.localStorage.getItem('token');
        try{

        await axios.post(`http://localhost:8080/transaction/customer/${currCustomer.id}`,finalBillData, {
                    'headers' : {
                        'Authorization' : token,
                        'Content-Type' : 'application/json'
                      }
        })
        await axios.put(`http://localhost:8080/customer/${currCustomer.id}`, {
              ...currCustomer,
              'points' : points
              },{
                    'headers' : {
                        'Authorization' : token,
                        'Content-Type' : 'application/json'
                      }
              })
        handleNext();
      }catch(err){
        console.log(err);
      }
        
    }
    return (
      <div>
          <div className="py-8 text-center font-heading text-3xl text-primary-800">Bill</div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SNo</TableCell>
            <TableCell align="right">Inventory-Id</TableCell>
            <TableCell align="right">Price (Rs)</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {billData.map((row, ind) => (
            <TableRow
              key={ind + 1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {ind + 1}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.selling_price}</TableCell>
              <TableCell align="right">{findValue(row.new_damaged_quantity, row.new_required_quantity) }</TableCell>
              <TableCell align="right">{findValue(0,row.selling_price) *(findValue(row.new_damaged_quantity, row.new_required_quantity))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <div className=' pt-3'>
          <div className='text-center font-normal'>Total Bill : {totalBill} Rs</div>
          <div className='flex justify-around'>
          <Input type={'number'} placeholder={'Enter final Bill'} name={"Final Bill"} value={finalBill} onChange={(e)=>setFinalBill(e.target.value)} />
          <Input type={'number'} placeholder={'Enter Points'} name={"Points"} value={points} onChange={(e)=>setPoints(e.target.value)} />
          </div>
          <div className="flex justify-center">
              <div onClick={handleOnClick}
                        className="cursor-pointer m-3 font-normal py-2 px-3 border-2 rounded-lg bg-primary-500 text-white">
                        Add the Bill
              </div>
            </div>
      </div>  
      </div>
    )
  }
  
  export default Bill
