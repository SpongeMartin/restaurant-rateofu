const DeleteButton = (props) => {
  return (
    <button className="deleteButton" onClick={() => props.deleteButton(props.item.id)}>X</button>
  )
}

export default DeleteButton