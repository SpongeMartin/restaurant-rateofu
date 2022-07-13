import Beverage from "./Beverage"
import AddButton from "./buttons/AddButton"
import InputNum from "./buttons/InputNum"
import SubstractButton from "./buttons/SubstractButton"

const Beverages = (props) => {
    return(
        <div className="beveragesWindow">  
            <h2 style={{textAlign:"center"}}>Beverages</h2>
            {props.drinks.map((drink) => drink.type === "Drink" ? (
                <div key={drink.id} className="beverage inline">
                    <Beverage drink={drink}/>
                    <InputNum item={drink} />
                    <AddButton addButton={props.addButton} item={drink}/>
                    <SubstractButton substractButton={props.substractButton} item={drink}/>
                </div>
            ):void(0))}
        </div>
    )
}

export default Beverages