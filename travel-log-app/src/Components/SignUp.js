import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
    const signupStyle = {
        backgroundColor: "#5C469C",
    }

    const [message, setMessage] = useState('');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 

    const signUpUser = async ()=>{
        try {
            let response = await axios.post('http://localhost:5000/signUp-User', {username, password}).then(response=>{
                if(response.data == "Unique User")
                    window.location.href = 'http://localhost:3000/';

                else{
                    setMessage("Please Enter Unique Username !");
                }
            }
            );
        } catch (error) {
            console.error('Error sending user credentials:', error);
          }
    }

  return (
    <div>
        <div className="box" style={signupStyle}>

            <img src={require("../Icons/add-user.png")} className="profile"/>

            <h1>Create Account</h1>
                
                <p>Create Username</p>
                <p className = "duplicate-user">{message}</p>
                <input type="text" onChange={(e)=>{setUsername(e.target.value)}} placeholder="Enter Username"/>
                <p>Create Password</p>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password"/>
                <input onClick={signUpUser} type="submit" value="Submit"/>
                <Link className="links"to={'/'}>Login Page</Link>
        
            <div className = "bottom">
                <Link className="footer-link" to={"https://www.linkedin.com/"}><img className="social-media" src={require("../Icons/linkedin.png")}/></Link>
                <Link className="footer-link" to={"https://twitter.com/"}> <img className="social-media" src={require("../Icons/twitter.png")}/></Link>
                <Link className="footer-link" to={"https://www.instagram.com/"}><img className="social-media" src={require("../Icons/instagram.png")}/></Link>
            </div>

        </div>
    </div>
  )
}

export default SignUp
