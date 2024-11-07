import { Button, Container, Modal } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';


import CloseIcon from '@mui/icons-material/Close';
import SelectSupplierData from "./SelectSupplierData";
import SelectActiveDressData from "./SelectActiveDressData";
import SupplierBill from "./SupplierBill";
export default function Form({supplierAddOpen, setSupplierAddOpen }) {
  const steps = ['Select the Supplier', 'Select the Active Dress Colleciton', 'Add Bill'];
    // Select the customer and then 
  const [currSupplier, setCurrSupplier] = useState(null);
  const [activeDressData, setActiveDressData] = useState([]);
    // Select all the inventory taken
    //  Calculate Bill


  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


    return (
        <>
        <Modal open={supplierAddOpen} onClose={()=>setSupplierAddOpen(false)} className="focus:outline-none">
            <div className="flex flex-col justify-center h-screen">
                <Container className="bg-secondary-300 rounded-lg text-background m-10 border-2">
                    <div className="flex justify-end cursor-pointer">
                        <CloseIcon 
                        sx={{ color: 'red', cursor: 'pointer', fontSize: 30 }}
                        color="font-bold text-xl mt-2" onClick={()=>setSupplierAddOpen(false)} />
                    </div>
    <Box sx={{ width: '100%' }}>
     <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 0 && (
      <div>
      <SelectSupplierData  currSupplier={currSupplier} setCurrentSupplier={setCurrSupplier}/>
      </div>)}
      {activeStep === 1 && (
      <div>
      <SelectActiveDressData  activeDressData={activeDressData} setActiveDressData={setActiveDressData} currSupplierData={currSupplier} />
      </div>)}
       {activeStep === 2 && (
        <div>
          <SupplierBill currSupplier={currSupplier} activeDressData={activeDressData} handleNext={handleNext} />
        </div>
      )
      } 
  
      {activeStep === steps.length ? (
        <React.Fragment>
          <div className="text-center font-heading text-3xl py-6 pt-10">Transaction added Succesfully !!</div>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
                </Container>

            </div>
        </Modal>
        </>
    )
}
