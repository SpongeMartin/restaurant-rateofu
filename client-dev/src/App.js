import './App.css';
import io from 'socket.io-client';
import React, {useState,useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginView from './components/loginpath/LoginView';
import Barman from './components/staffpath/Barman';
import Chef from './components/staffpath/Chef';
import Waiter from './components/staffpath/Waiter';
import MainView from './components/mainpath/MainView';
import WaitingView from './components/waitingpath/WaitingView';
import StaffView from './components/staffpath/StaffView';

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
  const [guest,setGuest] = useState(0)
  const [staff,setStaff] = useState(0)

  useEffect(()=>{
  if((location==="/" || location==="/waiting") && (guest === 0 || guest.connected === false)){
    console.log(location)
    setGuest(io.connect("http://localhost:5000/guest"))
  }else if((location === "/login" || location ==="/staff") && (staff === 0 || staff.connected === false)){
    setStaff(io.connect("http://localhost:5000/staff"))
  }},[location])

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
    let finishedOrder = items.filter((item)=> item.qty>0)
    guest.emit("new order",finishedOrder);
    guest.on("new order confirmed",(orderId)=>{
      console.log(orderId)
    })
  }

  

  return (
    <Router>
      <div className="container">
      <Routes>
        <Route path="/" element={
          <>
            <MainView setLocation={setLocation} location={location} cost={cost} addButton={addButton} items={items} submitButton={submitButton} deleteButton={deleteButton} substractButton={substractButton} />
          </>
        } />
        <Route path="/waiting" element={
          <>
            <WaitingView guest={guest} setLocation={setLocation} location={location} items={items} setItems={setItems}/>
          </>
        }/>
        <Route path="/login" element={
          <div>
            <LoginView staff={staff} setLocation={setLocation} locationn={location}/>
          </div>
        }/>
        <Route path="/staff" element={
          <div>
            <StaffView staff={staff} setLocation={setLocation} location={location}/>
          </div>
        }/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
