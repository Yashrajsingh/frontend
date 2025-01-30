import React, { useContext, useEffect, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../Context/StoreContext.jsx'
import axios from "axios"
const LoginPopUp = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext)
    const [currentState, setCurrentState] = useState("log-in")
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onchangehandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({...data,[name]:value}))
    }

    const onLogin = async (event) => {
       
        event.preventDefault()
        
        let newUrl = url
        if(currentState === "log-in"){
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data);

        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        } else {
            alert(response.data.message)
        }
    }

    useEffect(() => {
        console.log(data)
    },[data])

  return (

    <div className="loginpopup">      
        <form onSubmit={onLogin} className="loginpopupcontainer">
            
            <div className="loginpopuptitle">           
                <h2>{currentState}</h2>
                <img onClick={() => setShowLogin(false) } src={assets.cross_icon} alt="" />
            </div>
            
            <div className="loginpopupinputs">
                {currentState==="log-in"?<></>:<input name='name' onChange={onchangehandler} value={data.name} type="text" placeholder='Your name' required/>}
                <input name='email' onChange={onchangehandler} value={data.email} type="email" placeholder='Enter your email' required/>
                <input  name='password' onChange={onchangehandler} value={data.password} type="password" placeholder='password' required/>
            </div>
        
            <button type='submit'>
                {currentState==="sign-Up"?"Create account":"Log-in"}
            </button>

            <div className="loginpopupcondition">
                
                <input type="checkbox" required/>
                <p>
                    By continuing , i agree to the terms of use & privacy policy.
                </p>

            </div>

            {currentState === "log-in" 
            ? <p>
                Create a new account 
                <span onClick={() => setCurrentState("sign-Up")}>
                    Click here.
                </span>
              </p> 
            : <p>Already have an account. 
                <span onClick={() => setCurrentState("log-in")}>
                    Login here.
                </span>
              </p>
            }

        </form>    
    </div>
  )
}

export default LoginPopUp