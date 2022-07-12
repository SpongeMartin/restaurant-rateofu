import Dish from "./Dish"

const Dishes = (props) => {
    return(
        <div className="dishesWindow">  
            <h2 style={{textAlign:"center"}}>Dishes</h2>
            {props.dishes.map((dish) => (
                <Dish key={dish.id} name={dish.name} price={dish.price}/>
            ))}
        </div>
    )
}

export default Dishes