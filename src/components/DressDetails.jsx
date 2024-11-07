import { useEffect, useState } from "react";
import { Modal, Container } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import Input from "./Input";
import DeleteIcon from '@mui/icons-material/Delete';
import Form from "../components/Form"

import Get from "../components/useGet"


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'

function DressDetails({ dressModalId, setDressModalId, dressOpen, setDressOpen }) {
  const [dressDetails, setDressDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const [stockDetails, setStockDetails] = useState(null);
  const dressData = Get("http://localhost:8080/dresses");
  console.log("DressDetails dressData", dressData);
  //let matchingDress;
  useEffect(() => {
    if (dressModalId) {
      const token = window.localStorage.getItem('token');
      setLoading(true);
      axios.get(`http://localhost:8080/dresses/${dressModalId}/stock`, {
        'headers': {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          const matchingDresses = res.data.filter(item => item.dress_id === dressModalId);
          const matchingDress = dressData.filter(dress => dress.id === dressModalId);
          setDressDetails(matchingDress);
          console.log("matchingDresss", dressDetails);
          setStockDetails(matchingDresses);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        })
    }
  }, [dressOpen, reload]);



  const fields = [
    {
      name: "available_quantity",
      type: "text",
      placeholder: "Name",
      initialValue: ""
    },
    {
      name: "purchase_date",
      type: "text",
      placeholder: "Brand",
      initialValue: ""
    },
    {
      name: "purchase_price",
      type: "text",
      placeholder: "Gender",
      initialValue: ""
    },
    {
      name: "selling_price",
      type: "text",
      placeholder: "Size",
      initialValue: ""
    },
    {
      name: "damaged_quantity",
      type: "number",
      placeholder: "Color",
      initialValue: ""
    }
  ];

  // useEffect(() => {
  //   if (dressModalId) {
  //     const token = window.localStorage.getItem('token');
  //     setLoading(true);
  //     axios.get(`http://localhost:8080/dresses/${dressModalId}/stock`, {
  //       'headers': {
  //         'Authorization': token,
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //       .then((res) => {
  //         console.log("get in dressDetails.jsx", res);
  //         setDressDetails(res.data);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         console.log(err);
  //       })
  //   }
  // }, [dressOpen, reload]);

  function handleOnclose() {
    setDressOpen(false);
    setDressModalId(null);
  }



  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


  return (<Modal open={dressOpen} onClose={handleOnclose}>
    <div className="flex flex-col justify-center h-screen p-0">
      <Container className="bg-secondary-300 rounded-lg text-background m-10 border-2 pt-4 pb-6">
        <div className="flex justify-end cursor-pointer">
          <CloseIcon
            sx={{ color: 'red', cursor: 'pointer', fontSize: 30 }}
            color="font-bold text-xl mt-2" onClick={handleOnclose} />
        </div>
        {(dressDetails?.length > 0) ?
          <div className="grid grid-cols-2 gap-8 text-xl font-normal text-gray-500">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex justify-center cursor-pointer text-black">Name: </div>
              <div className="flex justify-left cursor-pointer">{dressDetails[0]?.name}</div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex justify-center cursor-pointer text-black">Brand: </div>
              <div className="flex justify-left cursor-pointer">{dressDetails[0]?.brand}</div>
            </div>
            <div className="flex items-center justify-center space-x-2">

              <div className="flex justify-center cursor-pointer text-black">Color: </div>
              <div className="flex justify-left cursor-pointer">{dressDetails[0]?.color}</div>

            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex justify-center cursor-pointer text-black">Gender: </div>
              <div className="flex justify-left cursor-pointer">{dressDetails[0]?.gender}</div>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <div className="flex justify-center cursor-pointer text-black">Size: </div>
              <div className="flex justify-left cursor-pointer">{dressDetails[0]?.size}</div>
            </div>
          </div>

          : <div className="flex justify-center cursor-pointer">Loading...</div>}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>{fields[0]["name"]}</StyledTableCell>
                <StyledTableCell align="center">{fields[1]["name"]}</StyledTableCell>
                <StyledTableCell align="center">{fields[1]["name"]}</StyledTableCell>
                <StyledTableCell align="center">{fields[3]["name"]}</StyledTableCell>
                <StyledTableCell align="center">{fields[4]["name"]}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockDetails?.map((row) => (
                <StyledTableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row[fields[0]["name"]]}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row[fields[1]["name"]]}</StyledTableCell>
                  <StyledTableCell align="center">{row[fields[2]["name"]]}</StyledTableCell>
                  <StyledTableCell align="center">{row[fields[3]["name"]]}</StyledTableCell>
                  <StyledTableCell align="center">{row[fields[4]["name"]]}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div >
  </Modal >)
}


export default DressDetails

























