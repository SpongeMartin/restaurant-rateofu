const InputNum = (props) => {
  return (
    <input className="input" readOnly={true} value={props.item.qty}/>
  )
}

export default InputNum