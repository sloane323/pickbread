import PurchasingMaterial from "./PurchasingMaterial";

const PurchasingMaterials = (props) => {
  return (
    <div>
      {props?.materials &&
        props.materials.map((material) => {
          return <PurchasingMaterial key={material.materialID} material={material} />;
        })}
    </div>
  );
};

export default PurchasingMaterials;
