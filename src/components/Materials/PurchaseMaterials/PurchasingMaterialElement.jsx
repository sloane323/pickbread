const PurchasingMaterialElement = (props) => {
  return (
    <div>
      <span>{props.material.name} {props.material.size}{props.material.unit} {props.material.amount}개</span>
    </div>
  );
};

export default PurchasingMaterialElement;
