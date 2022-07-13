import './App.css';
import io from 'socket.io-client';
import React, {useState,useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Beverages from './components/Beverages'
import Dishes from './components/Dishes'
import Order from './components/Order'
//import Addtask from './components/AddTask'
let guest = io.connect("http://localhost:5000/guest")



function App() {
  const [order,setOrder] = useState([])
  const [dishes,setDishes] = useState([
    {
      id:1,
      name:"Grilled space-whale steak with algae puree",
      price:"66.50€",
      count:0
    },
    {
      id:2,
      name:"Hagro biscuit",
      price:"32.00€",
      count:0
    },
    {
      id:3,
      name:"Ameglian Major Cow casserole",
      price:"55.75€",
      count:0
    }
  ])
  const [beverages,setBeverages] = useState([
    {
      id:4,
      name:"Tea substitute",
      price:"1.50€",
      count:0
    },
    {
      id:5,
      name:"Pan Galactic Gargle Blaster",
      price:"5.50€",
      count:0
    },
    {
      id:6,
      name:"Janx Spirit",
      price:"7.00€",
      count:0
    },
    {
      id:7,
      name:"Tzjin-anthony-ks",
      price:"11.50€",
      count:0
    }
  ])

  function contains(item){
    console.log(order)
    if(order.length<1) return false
    return(order.filter((items)=>items.id === item.id ? true : false))
  }

  const addButton = (id,item) => {
    if(id<dishes.length) setDishes(dishes.map((dish) => dish.id === id ? {...dish, count: dish.count+1} : dish))
    else setBeverages(beverages.map((beverage) => beverage.id === id ? {...beverage, count: beverage.count+1} : beverage))
    if(contains(item)) setOrder(order.map((items) => items.id === item.id ? {...items, count: items.count+1} : items))
    else {
      setOrder([...order,item])
      console.log(order)
    }
  }

  const substractButton = (id) =>{
    if(id<dishes.length) setDishes(dishes.map((dish) => dish.id === id && dish.count >0 ? {...dish, count: dish.count-1} : dish))
    else setBeverages(beverages.map((beverage) => beverage.id === id && beverage.count>0 ? {...beverage, count: beverage.count-1} : beverage))
  }

  const deleteButton = (id) => {
    if(id<dishes.length) setDishes(dishes.map((dish) => dish.id === id ? {...dish, count: 0} : dish))
    else setBeverages(beverages.map((beverage) => beverage.id === id ? {...beverage, count: 0} : beverage))
  }

  const submitButton = (id) => {

  }

  const cost = () => {

  }

  return (
    <Router>
      <div className="container">
       <h1 style={{textAlign:"center",marginBottom:"3px"}} >Welcome to Rateofu!</h1>
      
      <Routes>
        <Route path="/" element={
          <div>
            <Beverages drinks={beverages} addButton={addButton} substractButton={substractButton}/>
            <Dishes dishes={dishes} addButton={addButton} substractButton={substractButton}/>
            <Order items={order} addButton={addButton} substractButton={substractButton}
             deleteButton={deleteButton} submitButton={submitButton} cost={cost} />
          </div>
        } />
        <Route path="/login" element={
          <p>a</p>
        }/>
        <Route path="/staff" element={
          <p>a</p>
        }/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
