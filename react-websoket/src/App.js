import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ChartRoom from './pages/ChartRoom';
import { Provider} from 'react-redux'
import React, { useState,useEffect, createContext } from "react";
import store from './store'
import Ws from "./socket";

export const WsContext = createContext('');
let socket = new Ws('ws://localhost:3131/websocket/getsystelist')
function App() {
  
  useEffect(() => {
    socket = new Ws('ws://localhost:3131/websocket/getsystelist')
    socket.initWs()
  }, [])
  return (
    <Provider store={store}>
      <WsContext.Provider value={socket}>
        <div className="App">
        <Login/>
          {/* <BrowserRouter>
              <Routes>
                  <Route path='/login' element={Login()} />
                  <Route path='/chartroom' element={ChartRoom()} />
              </Routes>
          </BrowserRouter> */}
        </div>
      </WsContext.Provider>
    </Provider>
  );
}

export default App;
