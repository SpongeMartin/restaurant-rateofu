import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import io from 'socket.io-client'
const staff=io.connect("http://localhost:5000/staff"); 

const Login = () => {
    const [username,setUsername] = useState("")
    const [usertype,setUsertype] = useState("Chef")


    const login = (user,usertype)=>{
        let message = {name:user,type:usertype}
        console.log(message.name)
        if(user.length>0) staff.emit("login",message,true)
    }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" onChange={e=>setUsername(e.target.value)} />
        </label>
        <label>
            <p style={{paddingBottom:"0px", marginBottom:"0px"}} >Select profession:</p>
            <select className='profession-select' onChange={e=>setUsertype(e.target.value)}>
            <option value="chef">Chef</option>
            <option value="barman">Barman</option>
            <option value="waiter">Waiter</option>
            </select>
        </label>
        <div>
        <Link to="/staff"><button className='login-button' onClick={() => login(username,usertype)}>Submit</button></Link>
        </div>
      </form>
    </div>
  )
}

export default Login