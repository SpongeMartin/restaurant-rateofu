
const OrderItems = (props) => {
  function itemCost(item){
    return parseFloat(item.price.slice(0,-1)) * item.qty
  }
  return (
      <>
        <div className="itemTitle inline">
          <p>{props.item.title}</p>
        </div>
        <div className="itemPrice inline">
          <p>{itemCost(props.item)}€</p>
        </div>
      </>
  )
}

export default OrderItems