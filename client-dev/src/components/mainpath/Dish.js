const Dish = (props) =>{
    return(
        <>
            <div className="itemTitle inline">
                <p>{props.dish.title}</p>
            </div>
            <div className="itemPrice inline">
                <p>{props.dish.price}</p>
            </div>
        </>
    )
}

export default Dish