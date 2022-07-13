import Beverage from "./Beverage"

const Beverages = (props) => {
    return(
        <div className="beveragesWindow">  
            <h2 style={{textAlign:"center"}}>Beverages</h2>
            {props.drinks.map((drink) => (
                <Beverage key={drink.id} drink={drink} addButton={props.addButton} 
                substractButton={props.substractButton}/>
            ))}
        </div>
    )
}

export default Beverages