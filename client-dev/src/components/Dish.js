const Dish = (props) =>{
    return(
        <div className="dish inline">
            <p>{props.dish.name}</p>
            <p>{props.dish.price}</p>
            <input className="input" readOnly={true} value={props.dish.count}/>
            <button className="addButton" onClick={() => props.addButton(props.dish.id,props.dish)}>+</button>
            <button className="substractButton" onClick={() => props.substractButton(props.dish.id,props.dish)}>-</button>
        </div>
    )
}

export default Dish