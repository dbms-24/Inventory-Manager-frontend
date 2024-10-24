import EditIcon from '@mui/icons-material/Edit';

function EmployeeCard({employeeDetails, setEmployeeOpen, setEmployeeModalId, setEmployeeEditOpen, setEmployeeEditInitialValue}) {
    
  function handleOnclick(){
    setEmployeeOpen(true);
    setEmployeeModalId(employeeDetails?.emp_id);
  }
  function handleEditEmployeeTemplate(){
    setEmployeeEditInitialValue(employeeDetails);
    setEmployeeEditOpen(true)
  }
    return (
      <div className='relative'>
      <div className='flex justify-end mr-3 absolute right-0 top-2 z-10 transition-all duration-300 ease-in-out hover:scale-125 hover:border-primary-400 hover:shadow-lg' onClick={handleEditEmployeeTemplate}>
          <EditIcon className='text-xl text-yellow-500 font-bold' />
      </div> 
      <div className="text-center cursor-pointer border-2 border-primary-500 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:border-primary-400 hover:shadow-lg pt-3 pb-5" onClick={handleOnclick}>
          <div className="font-heading text-xl">
            {employeeDetails?.name}
          </div>
          <div>
            {employeeDetails?.role}
          </div>
      </div>
      </div>
    )
  }
  
  export default EmployeeCard;
