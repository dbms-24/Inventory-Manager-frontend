import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';

function UserCard({userDetails}) {
  const token = window.localStorage.getItem('token')

  function handleDeleteUser(){
    axios.delete(`http://localhost:8080/admin/delete_user/${userDetails?.id}`,{
        'headers' : {
          'Authorization' : token,
          'Content-Type' : 'application/json'
        }
      })
      .then((res)=>{
        window.location.reload();
      })
      .catch((err)=>{
        setReload(!reload);
        console.log(err)
      })
  }
    return (
      <div className='relative'>
      <div className='flex justify-end mr-3 absolute right-0 top-2 z-10 transition-all duration-300 ease-in-out hover:scale-125 hover:border-primary-400 hover:shadow-lg' onClick={handleDeleteUser}>
          <DeleteIcon className='text-xl text-red-500 font-bold' />
      </div> 
      <div className="text-center cursor-pointer border-2 border-primary-500 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:border-primary-400 hover:shadow-lg pt-3 pb-5">
          <div className="font-heading text-xl">
            {userDetails?.name}
          </div>
          <div>
            {userDetails?.phone_number}
          </div>
      </div>
      </div>
    )
  }
  
  export default UserCard;
