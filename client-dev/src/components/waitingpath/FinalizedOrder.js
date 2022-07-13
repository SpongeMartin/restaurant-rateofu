import OrderItems from "../mainpath/OrderItems"

const FinalizedOrder = (props) => {
  return (
    <div className="orderList inline">
        <ul className="starList">
            {props.items.map((item) => item.qty > 0 ? (<li key={item.id}><OrderItems key={item.id} item={item}/></li>) : void(0))}
        </ul>
    </div>
  )
}

export default FinalizedOrder