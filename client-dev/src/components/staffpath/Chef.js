import React, { useEffect, useState } from 'react'
import FoodItems from './FoodItems'

const Chef = ({staff, order, guestId,readyItem}) => {
    const [foodOrders,setFoodOrders] = useState([])
    console.log(guestId)
  return (
    <div className='bar-window'>
      {order=="" ? <p>There are currently no orders!</p> : <></>}
      {foodOrders.map((orders) => <FoodItems key={orders.title} item={orders} guestId={guestId} readyItem={readyItem}/>)}
      {useEffect(()=>{setFoodOrders(order.map((orders)=>orders))},[order])}
    </div>
  )
}

export default Chef