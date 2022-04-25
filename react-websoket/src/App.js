import { BrowserRouter, Routes, Route ,useRoutes,useNavigate} from 'react-router-dom';
import Login from './pages/Login';
import ChartRoom from './pages/ChartRoom';
import { Provider} from 'react-redux'
import React, { useState,useEffect, createContext } from "react";
import routers from './router'
import store from './store'
import Ws from "./socket";

export const WsContext = createContext('');

function App() {
  let socket = new Ws('ws://localhost:3131/websocket/getsystelist')
  useEffect(() => {
    // setSocket = new Ws('ws://localhost:3131/websocket/getsystelist')
    socket.initWs()
  }, [])

  const GetRoutes = () => useRoutes(routers); //一定要是函数内
  return (
    <Provider store={store}>
      <WsContext.Provider value={socket}>
        <div className="App">
        
          <BrowserRouter>
            <Login/>
            <ChartRoom/>
            <Routes>
              {routers.map((item,index)=>{
                return (<Route key={index} path={item.path} element={item.component()} />)
              })}
            </Routes>
              {/* <GetRoutes /> */}
          </BrowserRouter>
        </div>
      </WsContext.Provider>
    </Provider>
  );
}

export default App;
