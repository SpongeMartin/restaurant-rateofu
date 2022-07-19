import React from 'react'
import { useLocation } from 'react-router-dom'
import Beverages from './Beverages'
import Dishes from './Dishes'
import Order from './Order'

const MainView = ({items,addButton,substractButton,deleteButton,cost,submitButton,location,setLocation}) => {
    setLocation(useLocation().pathname)
  return (
    <div>
        <h1 style={{textAlign:"center",marginBottom:"3px"}} >Welcome to Rateofu!</h1>
        <Beverages drinks={items} addButton={addButton} substractButton={substractButton}/>
        <Dishes dishes={items} addButton={addButton} substractButton={substractButton}/>
        <Order items={items} addButton={addButton} substractButton={substractButton}
        deleteButton={deleteButton} submitButton={submitButton} cost={cost}/>
    </div>
  )
}

export default MainView