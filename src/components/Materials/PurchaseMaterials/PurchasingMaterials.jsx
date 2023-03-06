import PurchasingMaterialElement from "./PurchasingMaterialElement";

const PurchasingMaterials = (props) => {
  return (
    <div>
      {props?.materials &&
        props.materials.map((material) => {
          return <PurchasingMaterialElement key={material.materialID} material={material} />;
        })}
    </div>
  );
};

export default PurchasingMaterials;
