import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

const LoginPage = (props) => {
    const loginStyle = {
        backgroundColor: "#495579",
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const loginUser = async ()=>{
        localStorage.setItem("profile",username);
        try {
            let response = await axios.post('https://fynd-final-backend.vercel.app/userLogin', {username, password}).then(response=>{
                if(response.data == "User Varified")
                window.location.href = 'https://fynd-final-frontend.vercel.app/home';

                else{
                    setMessage("Account Not Found !");
                }
            }
            );
        } catch (error) {
            console.error('Error sending user credentials:', error);
          }
    }

  return (
    <div>
        <div className="box" style={loginStyle}>

            <img src={require("../Icons/user.png")} className="profile"/>

            <h1>Login Here</h1>

                <p className='not-registered'>{message}</p>
                <p>Username</p>
                <input type="text" onChange={(e)=>{setUsername(e.target.value)}} placeholder="Enter Username"/>
                <p>Password</p>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placrholder="" placeholder="Enter Password"/>
                <input type="submit" onClick={()=>{props.userProfile(username); loginUser();}} name="" value="Login"/>
                <Link className="links"> Forgot Password</Link>
                <Link className="links"to={'/signup'}> Create Account</Link>

            <div className = "bottom">
                <Link className="footer-link" to={"https://www.linkedin.com/"}><img className="social-media" src={require("../Icons/linkedin.png")}/></Link>
                <Link className="footer-link" to={"https://twitter.com/"}> <img className="social-media" src={require("../Icons/twitter.png")}/></Link>
                <Link className="footer-link" to={"https://www.instagram.com/"}><img className="social-media" src={require("../Icons/instagram.png")}/></Link>
            </div>

        </div>
    </div>
  )
}

export default LoginPage;
