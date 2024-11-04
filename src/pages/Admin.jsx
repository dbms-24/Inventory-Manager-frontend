import axios from "axios";
import { useEffect, useState } from "react"

function Admin() {
    const [usersData, setUsersData] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
      setLoading(true);
      const token = window.localStorage.getItem('token');
      axios.get('http://localhost:8080/admin/get_users/',{
      'headers':{
      'Authorization' : token,
      'Content-Type' : 'application/json'
      }
      }).then((res)=>{
      setLoading(false);
      setUsersData(res.data);
    }).catch((err)=>{
      setLoading(false)
      console.log(err);
      alert("Request failed reload the page");
    })
    }, [])
    return (
      <div className="min-h-screen">
      Admin Page
      </div>
    )
  }
  
  export default Admin
