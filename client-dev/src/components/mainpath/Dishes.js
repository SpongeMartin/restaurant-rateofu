import AddButton from "./buttons/AddButton"
import InputNum from "./buttons/InputNum"
import SubstractButton from "./buttons/SubstractButton"
import Dish from "./Dish"

const Dishes = (props) => {
    return(
        <div className="dishesWindow">  
            <h2 style={{textAlign:"center"}}>Dishes</h2>
            {props.dishes.map((dish) => dish.type === "Food" ? (
                <div key={dish.id} className="dish inline">
                    <Dish dish={dish}/>
                    <InputNum item={dish} />
                    <AddButton addButton={props.addButton} item={dish}/>
                    <SubstractButton substractButton={props.substractButton} item={dish}/>
                    </div>):void(0))}
            
        </div>
    )
}

export default Dishes