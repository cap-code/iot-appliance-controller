import {Switch,Slider} from "@mui/material"
const VariableDevices = (props) => {
    return ( 
        <div>
            <div className="variableContainer">
                <div className="variableTop">
                    <div>
                        {props.name}
                    </div>
                    <div>
                        <Switch />
                    </div>
                </div>
                <div style={{textAlign:"center"}}>
                    <Slider defaultValue={0} steps={5} marks min={0} max={4} valueLabelDisplay="auto"/>
                </div>
            </div>
        </div>
     );
}
 
export default VariableDevices;