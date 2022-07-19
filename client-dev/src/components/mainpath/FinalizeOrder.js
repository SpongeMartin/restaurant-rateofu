import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

const FinalizeOrder = (props) => {
    
  return (
    <>
        <h3>Total cost: {props.cost}€</h3>
        <Link to={"/waiting"}><button className="submitButton" onClick={props.submitButton}>Order </button></Link>
    </>
  )
}

export default FinalizeOrder