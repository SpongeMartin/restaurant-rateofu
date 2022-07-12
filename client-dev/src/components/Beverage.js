const Beverage = (props) =>{
    return(
        <div className="beverage">
            <p className="inline-table">{props.drink.name} </p>
            <p className="inline-table">{props.drink.price}</p>
            <input readOnly={true} value={props.drink.count}/>
            <button className="inline-table addbutton" onClick={() => props.addButton(props.drink.id)}>+</button>
            <button className="inline-table addbutton" onClick={() => props.substractButton(props.drink.id)}>-</button>
        </div>
    )
}

export default Beverage
