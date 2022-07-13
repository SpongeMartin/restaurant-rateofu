const Beverage = (props) =>{
    return(
        <>
            <div className="itemTitle inline">
                <p>{props.drink.title}</p>
            </div>
            <div className="itemPrice inline">
                <p>{props.drink.price}</p>
            </div>
        </>
    )
}

export default Beverage
