import { useNavigate ,Link } from 'react-router-dom'
function Login() {
    // let navigate = useNavigate()

    // function handleClick(e) {
    //     // navigate('/chartRoom' )
    // }

    return (
        <div className="login">
             <Link to="/chartRoom">
                <button >登录</button>
            </Link>
            {/* <button onClick={handleClick}>登录</button> */}
        </div>
    );
}

export default Login();