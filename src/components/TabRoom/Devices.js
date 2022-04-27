import {Lightbulb,LightbulbOutlined} from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState,useEffect } from "react";
import {w3cwebsocket as W3CWebSocket} from "websocket"

const client = new W3CWebSocket('ws://192.168.206.130:4000');

const Devices = (props) => {
    const [on,setOn]  = useState(false)
    const [mounted, setMounted] = useState(false)
    //  if(mounted){
       

    //  }
     console.log("working");
     useEffect(() =>{
        client.onopen = () => {
            console.log("hello")
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            console.log(JSON.parse(message));
        };
        setMounted(true)
      },[])
    const handleClick = ()=>{
        if(on){
            var data ={
                dest:"MSG201",
                id:props.uid.toString(),
                state:"1"
            }
            console.log(data,"on");
            client.send(JSON.stringify(data))
            setOn(false);
        }else if(!on){
            var data ={
                dest:"MSG201",
                id:props.uid.toString(),
                state:"-1"
            }
            console.log(data,"off");
            client.send(JSON.stringify(data))
            setOn(true);
        }
    }
    return ( 
        <div>
            <Button className="DeviceContianer" onClick={()=>{handleClick()}}>
                <div className="DeviceFlex">
                    <div>
                        {on && <Lightbulb fontSize="large"/>}
                        {!on && <LightbulbOutlined fontSize="large"/>}
                    </div>
                    <div>
                        {props.name}
                    </div>
                </div>
            </Button>
        </div>
     );
}
export {Devices,client};

