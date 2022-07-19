import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Barman from './Barman'
import Chef from './Chef'
import Waiter from './Waiter'

const StaffView = ({location,setLocation,staff}) => {
    let navigate = useNavigate()
    let state = useLocation().state
    const [username,setUsername] = useState("")
    const [queue,setQueue] = useState([])
    const [guestID,setGuestID] = useState("")
    const [readyQueue,setReadyQueue] = useState([])
    const [usertype,setUsertype] = useState("")

    useEffect(()=>{
        async function handleRedirect(){
            if(state===null) {
                return navigate('/login')
            }else{
                setUsername(state.username);
                setUsertype(state.usertype);
            } 
        }
        handleRedirect()
    })

    useEffect(()=>{
        staff.on('new work order', order => {
            setQueue(order.items)
            setGuestID(order.guestId)
        })
    },[])
    
    staff.on("new servable order", order=>{
        setReadyQueue(order)
    })

    const readyItem = (guestId,item) =>{
        if(item.status==="PROCESSING"){
            staff.emit("order item ready",guestId,item)
        }
    }

    staff.on("order refreshed",(order)=>{
        setQueue(order.items)
    })

    staff.on("order marked as ready",order=>{
        setQueue([])
    })
    
    const orderBeingDelivered = (order) =>{
        staff.emit("order served",order)
        staff.on("order was served",order=>{
            setReadyQueue([])
        })
    }

  return (
    <div>
        <h2 className='coloredH2'>Hello {username}</h2>
        <Barman order={queue}/>
        {usertype==="waiter" ? <Waiter order={readyQueue} orderBeingDelivered={orderBeingDelivered}/> :
            <Chef order={queue} guestId={guestID} readyItem={readyItem}/>}
    </div>
  )
}

export default StaffView