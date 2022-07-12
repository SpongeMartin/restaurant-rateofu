const Dish = (props) =>{
    return(
        <div className="dish">
            <p>{props.name}</p>
            <button></button>
            <p>{props.price}</p>
        </div>
    )
}

export default Dish