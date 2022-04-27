import { HomeRounded,DevicesRounded,SettingsApplicationsRounded } from '@mui/icons-material';
import { BottomNavigation,BottomNavigationAction }  from '@mui/material';
import {Link} from "react-router-dom"
import './TaskBar.css';
export default function TaskBar() {
  return (
    <div>
      <div style={{position:"fixed",bottom:"0px",width:"fit-content",zIndex: "100",left:"50%",transform:"translateX(-50%)"}}>
          <BottomNavigation  className="taskbar">
            <BottomNavigationAction component={Link} to="/" label="Home" icon={<HomeRounded fontSize="large" className="taskbar-icon"  style={{color:"hsl(0 0% 49.4%)"}}/>}/>
            <BottomNavigationAction  component={Link} to="/graph"  label="Devices" icon={<DevicesRounded fontSize="large" className="taskbar-icon" style={{color:"hsl(0 0% 49.4%)"}}/>}/>
            <BottomNavigationAction  component={Link} to ="/settings" label="settings" icon={<SettingsApplicationsRounded fontSize="large" className="taskbar-icon" style={{color:"hsl(0 0% 49.4%)"}}/>}/>
          </BottomNavigation>`
      </div>
    </div>
  )
}
