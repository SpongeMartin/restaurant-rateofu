import React, { useEffect, useState } from 'react'
import WaiterItems from './WaiterItems'

const Waiter = ({order,delivered,orderBeingDelivered}) => {
  const [waiterOrders,setWaiterOrders] = useState([])
  return (
    <div id="waiterDiv"  onClick={() => orderBeingDelivered(waiterOrders)}>
      {order.guestId!==undefined ? <p>For guest: {order.guestId}</p> : <p>There are currently no items to deliver!</p>}
      {waiterOrders=="" ? void(0):(waiterOrders.items.map((orders) => <WaiterItems key={orders.title} item={orders}/>)) }
      {useEffect(()=>{if(order!==undefined) setWaiterOrders(order)},[order])}
    </div>
  )
}

export default Waiter