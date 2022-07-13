const Beverage = (props) =>{
    return(
        <div className="beverage inline">
            <p>{props.drink.name} </p>
            <p>{props.drink.price}</p>
            <input className="input" readOnly={true} value={props.drink.count}/>
            <button className="addButton" onClick={() => props.addButton(props.drink.id,props.drink)}>+</button>
            <button className="substractButton" onClick={() => props.substractButton(props.drink.id,props.drink)}>-</button>
        </div>
    )
}

export default Beverage
