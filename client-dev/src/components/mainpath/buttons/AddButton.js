const AddButton = (props) => {
  return (
    <button className="addButton" onClick={() => props.addButton(props.item.id)}>+</button>
  )
}

export default AddButton