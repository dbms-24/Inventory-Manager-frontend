import {useState} from "react"
import { useContext } from "react"
import { UserContext } from "../App"
import { ThemeContext } from "../App";
import UserDetails from "../components/UserDetails";
import { DarkMode, LightMode } from "@mui/icons-material"
import Switch from '@mui/material/Switch';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import Brightness7Icon from '@mui/icons-material/Brightness7';


function AppBar({setTheme}) {
    const userDetails = useContext(UserContext);
    const theme = useContext(ThemeContext)
    const [checked, setChecked] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
    function handleThemeChange(){
      setChecked(event.target.checked);
      if(theme == 'light'){
        setTheme('dark');
      }else {
        setTheme('light');
      }
    }

    function handleOnclick(){
      setUserOpen(true);
    }

    return (
        <div className={"flex justify-between px-5 py-3 mb-2 border-b shadow-primary-300 shadow-md " + `${(theme=='light') ? 'border-primary-500' : 'border-white'}`}>
        <div className="font-heading text-2xl">Garment Store</div>
        <div className="flex flex-col justify-center">
          <div className="flex">
            <div className="mr-2">
            <Switch
              checked={checked}
              onChange={handleThemeChange}
              checkedIcon={< NightsStayIcon style={{ color: 'white' }}/>}
              icon={< Brightness7Icon style={{ color: 'gold' }}/>}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex">
                <div className="border-2 border-primary-500 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:border-primary-400 hover:shadow-lg cursor-pointer px-2 py-1 flex items-center justify-center mr-4">Home</div>
                {
                  userDetails ? 
                  <div>
                  <div className="w-10 h-10 border-2 border-primary-500 rounded-full transition-all duration-300 ease-in-out hover:scale-110 hover:border-primary-400 hover:shadow-lg cursor-pointer flex items-center justify-center" onClick={handleOnclick} >
                    <span className="text-primary-500">{userDetails.name[0]}</span>
                  </div>
                  <UserDetails userOpen={userOpen} setUserOpen={setUserOpen} />
                  </div>:
                  <div>Login</div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default AppBar
