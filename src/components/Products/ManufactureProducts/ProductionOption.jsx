const ProductionOption = (props) => {
  return (
    <option id={props?.production.제품ID}>
      {props?.production.이름}({props?.production.사이즈}
      {props?.production.단위})
    </option>
  );
};

export default ProductionOption;
