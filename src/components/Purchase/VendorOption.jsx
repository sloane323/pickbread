const VendorOption = (props) => {
  return <option id={props?.vendor.벤더ID}>{props?.vendor.이름}</option>;
}
 
export default VendorOption;