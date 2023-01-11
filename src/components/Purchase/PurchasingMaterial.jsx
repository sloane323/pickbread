const PurchasingMaterial = (props) => {
  return (
    <div>
      <span> 원재료 : {props.material.name}</span>
      <span> 수량 : {props.material.amount}</span>
    </div>
  );
};

export default PurchasingMaterial;
