import {Box,Tabs,Tab,Button,TextField,Modal,Typography,ButtonGroup} from "@mui/material"
import {TabPanel,TabContext} from "@mui/lab";
import { DeleteForever,LightbulbSharp} from "@mui/icons-material"
import { useState } from "react";
import './TabRoom.css';
import {Devices,client} from "./Devices";
import VariableDevices from "./VariableDevices";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';


var globalRoom = [];
var globalDevices = [];
var globalVaria = []

const appId = '875db495-a219-4b0d-bb26-645487323e3b';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);
const TabRoom = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    const [room,setRoom] = useState(globalRoom);
    const [devices,setDevices] = useState(globalDevices);
    const [varia,setVaria] = useState(globalVaria);
    const [message,setMessage] = useState('');
    const [deviceName,setDeviceName] = useState('');
    const [uid,setUid] = useState('');
    const [type,setType] = useState('');
    const [counter,setCounter]  = useState(1);
    const [value,setValue] = useState(0);
    const [name,setName] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    const addRoom = ()=>{
        globalRoom.unshift({
            name:name,
            index:counter
        })
        setRoom(globalRoom)
        console.log(globalRoom);
        setCounter(counter+1);
    }
    const handleAddDevices = (index)=>{
        if(type === "binary"){
            globalDevices.unshift({
                name:deviceName,
                uid:uid,
                tab:index
            })
            setDevices(globalDevices);
        }else{
            globalVaria.unshift({
                name:deviceName,
                uid:uid,
                tab:index
            })
            setVaria(globalVaria);
        }
        console.log(devices,varia);
    }
    const sendDataserver =()=>{
        SpeechRecognition.stopListening();
        if(transcript === "LIGHT ONE ON"){
            console.log("works voice");
            var data = {
                dest:"MSG201",
                id:"123",
                state:"-1"
            }
            client.send(JSON.stringify(data))
        }else if(transcript === "LIGHT TWO ON"){
            console.log("works voice");
            var data = {
                dest:"MSG201",
                id:"456",
                state:"1"
            }
            client.send(JSON.stringify(data))
        }else if(transcript === "LIGHT TWO OF" || transcript === "LIGHT TWO OFF"){
            console.log("works voice");
            var data = {
                dest:"MSG201",
                id:"456",
                state:"-1"
            }
            client.send(JSON.stringify(data))
        }else if(transcript === "LIGHT ONE OF" || transcript === "LIGHT ONE OFF"){
            console.log("works voice");
            var data = {
                dest:"MSG201",
                id:"123",
                state:"1"
            }
            client.send(JSON.stringify(data))
        }
    }
    return ( 
        <>
        <TabContext value={value.toString()}>
            <Box>
                <Tabs value={value.toString()} variant="scrollable" scrollButtons="auto" onChange={handleChange}>
                    {
                        room && room.map((room)=>(
                            <Tab label={room.name} value={room.index.toString()} key={room.index}/>
                        ))
                    }
                    <Tab label="Add room" value="0"/>
                </Tabs>
            </Box>
            <TabPanel value="0">
                <div className="AddRoomContainer">
                <TextField id="outlined-basic" defaultValue="" variant="outlined" label="Name of room" style={{color:"white"}} onChange={(e)=>{setName(e.target.value)}} />
                <Button variant="outlined" size="large" onClick={()=>{addRoom()}} style={{marginLeft:"10px"}}>Add</Button>
                </div>
            </TabPanel>
            {
                room && room.map((room)=>(
                    <TabPanel value={room.index.toString()}>
                        <div className="deviceFlex">
                        {
                            devices && devices.map(device=>{
                                if(device.tab === room.index){
                                  return   <Devices name={device.name} uid={device.uid} key={device.uid} /> 
                                }
                            })
                        }
                        </div>
                        <div className="variaFlex">
                            {
                                varia && varia.map(vari=>{
                                    if(vari.tab === room.index){
                                     return   <VariableDevices name={vari.name} uid={vari.uid} key={vari.uid}/>
                                    }
                                })
                            }
                        </div>
                        <div className="MoreButtonFlex">
                            <Button variant="outlined" className="createMargin" startIcon={<LightbulbSharp/>} onClick={handleOpen}>Add devices</Button>
                            <Button variant="outlined" className="createMargin deleteRed" startIcon={<DeleteForever/>}>Delete</Button>
                        </div>
                        <div>
                        <div>
                            <p>Microphone: {listening ? 'on' : 'off'}</p>
                            <Button variant="contained" style={{margin:"5px"}} onClick={SpeechRecognition.startListening}>Start</Button>
                            <Button variant="contained" style={{margin:"5px"}} onClick={()=>{sendDataserver()}}>Stop</Button>
                            <Button variant="contained" style={{margin:"5px"}} onClick={resetTranscript}>Reset</Button>
                            <p>{transcript}</p>
                            </div>
                        </div>
                        <Modal
                open={open}
                onClose={handleClose}
                    >
                    <Box className="modalStyle">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add your devices
                    </Typography>
                        <div>
                        <TextField id="outlined-basic" defaultValue="" variant="outlined" label="Device Name" style={{color:"white",margin:"10px"}} onChange={(e)=>{setDeviceName(e.target.value)}} />
                        <TextField id="outlined-basic" defaultValue="" variant="outlined" label="UID" style={{color:"white",margin:"10px"}} onChange={(e)=>{setUid(e.target.value)}} />
                            <ButtonGroup variant="outlined" aria-label="outlined button group" style={{margin:"10px"}}>
                            <Button onClick={()=>{setType("binary")}}>On/Off</Button>
                            <Button onClick={()=>{setType("nonbinary")}}>Varible</Button>
                            </ButtonGroup>
                        <br/>
                            <Button variant="contained" style={{margin:"10px"}} onClick={()=>{handleAddDevices(room.index)}}>Add</Button>
                        </div>
                    </Box>
            </Modal>
                    </TabPanel>

                ))
            }
        </TabContext>
        </>
     );
}
 
export default TabRoom;