import React, {useState,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import FinalizedOrder from './FinalizedOrder'

const WaitingView = ({setItems,items,setLocation,locationn,guest}) => {
    setLocation(useLocation.pathname)
    let navigate = useNavigate()
    guest.on("order refreshed",order=>{
      document.getElementById("orderWait").innerHTML = "Your order is being delivered!"
      let form = document.createElement("form")
      form.setAttribute("action","http://localhost:3000")
      let button = document.createElement("input")
      button.setAttribute("type","submit")
      button.setAttribute("value","New order")
      form.append(button)
      document.getElementById("waiting-div").appendChild(form)
    })
    
  return (
    <>
        <h2 className='coloredH2' id="orderWait">Your order is being prepared!</h2>
        <FinalizedOrder items={items}/>
    </>
  )
}

export default WaitingView