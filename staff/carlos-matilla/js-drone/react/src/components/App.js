import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import socket from '../socket';
import { gamepadConnect, gamepadDisconnect, check } from "../logic/gamepad";
import {keyDown, keyUp} from '../logic/keyboard'




function DroneStatus() {
  const [status, setStatus] = useState('DISCONNECTED');
  socket.on('status', () => {
    setStatus('CONNECTED')
  })
  socket.on('disconnect', () => {
    setStatus('DISCONNECTED')
  })
  return status;
}

function DroneState() {
  const [droneState, setDroneState] = useState('No Data');
  socket.on('dronestate', data => {
    setDroneState(data)
  })
  socket.on('disconnect', () => {
    setDroneState('No Data')
  })
  return droneState;
}


function App() {

  useEffect(() => {
    window.addEventListener("gamepadconnected", gamepadConnect);
    window.addEventListener("gamepaddisconnected", gamepadDisconnect);
    
    
    if(!check){ 
      document.addEventListener('keydown', keyDown);
      document.addEventListener('keyup', keyUp);
    }
    
  }, []);

  const status = DroneStatus();
  const state = DroneState()

  const { pitch, roll, yaw, vgx, vgy, vgz, templ, temph, tof, h, bat, baro, time, agx, agy, agz } = state


  return (
    <div className="Drone">
      <header className="App-header">
        {<img src={logo} className="App-logo" alt="logo" />}

        {<h3>{status}</h3>}
        <section className="telemetria">
          <div><p>Pitch</p><p>{pitch}</p></div>
          <div><p>Roll</p><p>{roll}</p></div>
          <div><p>Yaw</p><p>{yaw}</p></div>
          <div><p>V en X</p><p>{vgx}</p></div>
          <div><p>V en Y</p><p>{vgy}</p></div>
          <div><p>V en Z</p><p>{vgz}</p></div>
          <div><p>Temp min</p><p>{templ}</p></div>
          <div><p>Temp max</p><p>{temph}</p></div>
          <div><p>Tof</p><p>{tof}</p></div>
          <div><p>Altura</p><p>{h}</p></div>
          <div><p>Bateria</p><p>{bat}</p></div>
          <div><p>Barometro</p><p>{baro}</p></div>
          <div><p>Tiempo de vuelo</p><p>{time}</p></div>
          <div><p>AC en X</p><p>{agx}</p></div>
          <div><p>AC en Y</p><p>{agy}</p></div>
          <div><p>AC en Z</p><p>{agz}</p></div>
        </section>

      </header>

    </div>
  );
}

export default App;
