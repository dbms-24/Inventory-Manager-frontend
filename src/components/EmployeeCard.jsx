function EmployeeCard({id, name, role, setEmployeeOpen, setEmployeeModalId}) {
    
  function handleOnclick(){
    setEmployeeOpen(true);
    console.log("Clicked")
    console.log("id", id);
    setEmployeeModalId(id);
  }
    return (
      <div className="text-center cursor-pointer border-2 border-primary-500 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:border-primary-400 hover:shadow-lg py-5" onClick={handleOnclick}>
          <div className="font-heading text-xl">
            {name}
          </div>
          <div>
            {role}
          </div>
      </div>
    )
  }
  
  export default EmployeeCard;
