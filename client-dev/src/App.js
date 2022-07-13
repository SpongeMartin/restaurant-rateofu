import './App.css';
import io from 'socket.io-client';
import React, {useState,useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Beverages from './components/mainpath/Beverages'
import Dishes from './components/mainpath/Dishes'
import Order from './components/mainpath/Order'
import FinalizedOrder from './components/waitingpath/FinalizedOrder';
import Login from './components/Login';
//import Addtask from './components/AddTask'
const guest = io.connect("http://localhost:5000/guest")



function App() {
  const [location,setLocation] = useState(["/"])
  const [items,setItems] = useState([
    {
      id:1,
      title:"Grilled space-whale steak with algae puree",
      type:"Food",
      price:"66.50€",
      qty:0
    },
    {
      id:2,
      title:"Hagro biscuit",
      type:"Food",
      price:"32.00€",
      qty:0
    },
    {
      id:3,
      title:"Ameglian Major Cow casserole",
      type:"Food",
      price:"55.75€",
      qty:0
    },
    {
      id:4,
      title:"Tea substitute",
      type:"Drink",
      price:"1.50€",
      qty:0
    },
    {
      id:5,
      title:"Pan Galactic Gargle Blaster",
      type:"Drink",
      price:"5.50€",
      qty:0
    },
    {
      id:6,
      title:"Janx Spirit",
      type:"Drink",
      price:"7.00€",
      qty:0
    },
    {
      id:7,
      title:"Tzjin-anthony-ks",
      type:"Drink",
      price:"11.50€",
      qty:0
    }
  ])
  
  const [cost,setCost] = useState(0)

  const addButton = (id) => {
    setItems(items.map((item) => item.id === id ? {...item, qty: item.qty+1} : item))
    let sum=0
    items.forEach(element => {
      let price = parseFloat(element.price.slice(0,-1))
      sum += element.qty * price
      if(id===element.id) sum += price
    });
    setCost(sum)
  }

  const substractButton = (id) =>{
    setItems(items.map((item) => item.id === id && item.qty > 0 ? {...item, qty: item.qty-1} : item))
    let sum=0
    items.forEach(element => {
      let price = parseFloat(element.price.slice(0,-1))
      sum += element.qty * price
      if(id===element.id) sum -= price
    });
    sum<0 ? setCost(0) : setCost(sum)
  }

  const deleteButton = (id) => {
    setItems(items.map((item) => item.id === id ? {...item, qty: 0} : item))
    let sum=0
    items.forEach(element => {
      let price = parseFloat(element.price.slice(0,-1))
      if(id!==element.id) sum += element.qty * price
    });
    setCost(sum)
  }

  const submitButton = () => {
    //guest.emit("new order",items);
  }

  return (
    <Router>
      <div className="container">
       
      
      <Routes>
        <Route path="/" element={
          <div>
            <h1 style={{textAlign:"center",marginBottom:"3px"}} >Welcome to Rateofu!</h1>
            <Beverages drinks={items} addButton={addButton} substractButton={substractButton}/>
            <Dishes dishes={items} addButton={addButton} substractButton={substractButton}/>
            <Order items={items} addButton={addButton} substractButton={substractButton}
             deleteButton={deleteButton} submitButton={submitButton} cost={cost}/>
          </div>
        } />
        <Route path="/waiting" element={
          <div>
            <h2 className='coloredH2'>Your order is being prepared!</h2>
            <FinalizedOrder items={items}/>
          </div>
        }/>
        <Route path="/login" element={
          <div>
            <Login/>
          </div>
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
