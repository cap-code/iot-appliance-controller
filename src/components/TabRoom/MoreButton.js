import { DeleteForever,LightbulbSharp} from "@mui/icons-material"
import {Button} from "@mui/material";
import './TabRoom.css'

const MoreButton = () => {
    return ( 
        <div className="MoreButtonFlex">
            <Button variant="outlined" className="createMargin" startIcon={<LightbulbSharp/>}>Add devices</Button>
            <Button variant="outlined" className="createMargin deleteRed" startIcon={<DeleteForever/>}>Delete</Button>
        </div>
     );
}
 
export default MoreButton;