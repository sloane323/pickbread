const MaterialOption = (props) => {
  return <option id={props?.material.원자재ID}>{props?.material.이름} {props?.material.사이즈}</option>;
}

export default MaterialOption;