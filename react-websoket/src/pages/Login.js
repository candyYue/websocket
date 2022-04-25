import { useNavigate ,Link } from 'react-router-dom'
import React, { useState, useEffect ,useContext} from "react";
import { WsContext } from "../App";
import Ws from '../socket'
const Login = (props) => {
    const socket = useContext(WsContext);

    let navigate = useNavigate()

    function handleClick(e) {
        //存储用户信息
        const uerInfo = {name:'小红',message:[]}
        localStorage.setItem('uerInfo',JSON.stringify(uerInfo))
        socket.send(JSON.stringify(uerInfo))
        // navigate('/chartroom')
    }
    useEffect(() => {
    }, [])
    
    return (
        <div className="login">
            {/* <Link to="/chartRoom"></Link>  */}
            <button onClick={handleClick}>登录</button>
        </div>
    );
}

export default Login;