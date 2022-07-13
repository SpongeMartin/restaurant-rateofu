const OrderItems = (props) => {
  return (
    <div className="item inline">
        <p>{props.item.name}</p>
        <input className="input" readOnly={true} value={props.item.count}/>
        <button className="addButton" onClick={() => props.addButton(props.item.id)}>+</button>
        <button className="substractButton" onClick={() => props.substractButton(props.item.id)}>-</button>
        <button className="deleteButton" onClick={() => props.deleteButton(props.item.id)}>X</button>
    </div>
  )
}

export default OrderItems