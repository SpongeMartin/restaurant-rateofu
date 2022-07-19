import React, { useState,useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import io from 'socket.io-client'
let staff=0;

const Login = ({staff,location,setLocation}) => {
    const [username,setUsername] = useState("")
    const [usertype,setUsertype] = useState("chef")
    let locationName = useLocation().pathname
    useEffect(()=>{
      setLocation(locationName)
    },[])


    const login = (user,usertype)=>{
      let message = {name:user,type:usertype}
        if(user.length>0) staff.emit("login",message)
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
        <Link to="/staff" state={{username:`${username}`, usertype:`${usertype}`}}><button className='login-button' onClick={() => login(username,usertype)}>Submit</button></Link>
        </div>
      </form>
    </div>
  )
}

export default Login