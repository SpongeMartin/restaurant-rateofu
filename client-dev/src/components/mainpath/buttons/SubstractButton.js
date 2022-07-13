const SubstractButton = (props) => {
  return (
    <button className="substractButton" onClick={() => props.substractButton(props.item.id)}>-</button>
  )
}

export default SubstractButton