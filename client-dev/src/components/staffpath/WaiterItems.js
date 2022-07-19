import React from 'react'

const WaiterItems = ({item}) => {
  return (
    <div id={`item-status-${item.title}`} className="barItem inline">
        <p>{item.qty}x {item.title}</p>
    </div>
  )
}

export default WaiterItems