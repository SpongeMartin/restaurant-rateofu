import './App.css';
import React, {useState,useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="container">
       <h1>Welcome to Rateofu!</h1>
      
      <Routes>
        <Route path="/" element={
          <p>a</p>
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
