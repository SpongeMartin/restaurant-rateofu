import OrderItems from './OrderItems'
import FinalizeOrder from './FinalizeOrder'
const Order = (props) => {
  return (
    <div className="orderWindow">
        <h2 style={{display:"block"}}>Your order</h2>
        <div className='itemsWindow inline'>
            {props.items.length > 0 ? 
            (props.items.map((item)=><OrderItems key={props.item.id} item={props.item} addButton={props.addButton} substractButton={props.substractButton}
            deleteButton={props.deleteButton}/>)):(<h3>Please make an order!</h3>)}
         </div>
         <div className='sumup inline'>
            <FinalizeOrder cost={props.cost} submitButton={props.submitButton}/>
         </div>

    </div>
  )
}

export default Order