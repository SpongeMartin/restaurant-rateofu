
const FoodItems = ({staff,guestId,item,readyItem}) => {
    if(item.status==="READY"){
        let itemdom=document.getElementById(`item-status-${item.title}`)
        itemdom.style.cssText = "border-left: 4px solid green"
    }
  return (
    <>
    <div id={`item-status-${item.title}`} className="barItem inline" onClick={() => readyItem(guestId,item)}>
      <p>{item.qty}x {item.title}</p> 
    </div>
  </>
  )
}

export default FoodItems