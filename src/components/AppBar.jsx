import { useContext } from "react"
import { UserContext } from "../App"
import { ThemeContext } from "../App";

function AppBar() {
    const userDetails = useContext(UserContext);
    const theme = useContext(ThemeContext)
    return (
        <div className={"flex justify-between px-5 py-3 mb-2 border-b shadow-primary-300 shadow-md " + `${(theme=='light') ? 'border-primary-500' : 'border-white'}`}>
        <div className="font-heading text-2xl">Garment Store</div>
        <div className="flex flex-col justify-center">
        <div className="flex">
          <div className="mr-2">Home</div>
          {
            userDetails ? 
            <div>Logout</div>:
            <div>Login</div>
          }
        </div>
        </div>
      </div>
    )
  }
  
  export default AppBar
