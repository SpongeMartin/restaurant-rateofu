import OrderItems from './OrderItems'
import FinalizeOrder from './FinalizeOrder'
import AddButton from './buttons/AddButton'
import SubstractButton from './buttons/SubstractButton'
import DeleteButton from './buttons/DeleteButton'
import InputNum from './buttons/InputNum'

const Order = (props) => {
  return (
    <div>
      <h2 className='coloredH2'>Your order</h2>
      <div className="order-window">
            {props.items.length > 0 ?
            (props.items.map((item) => (item.qty > 0 ? (<div key={item.id} className='itemsWindow inline'><OrderItems  item={item}/> 
            <InputNum item={item} />
            <AddButton addButton={props.addButton} item={item}/>
            <SubstractButton substractButton={props.substractButton} item={item}/>
            <DeleteButton deleteButton={props.deleteButton} item={item}/></div>):void(0)))):(<h3>Please make an order!</h3>)}
         <div className='sumup inline'>
            <FinalizeOrder items={props.items} cost={props.cost} submitButton={props.submitButton}/>
         </div>
      </div>
    </div>
  )
}

export default Order