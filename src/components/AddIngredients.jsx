import React from "react";
import { useState } from "react";
import SearchIngredientsModal from "./SearchIngredientsModal";

const AddIngredients = ({addInput, setAddInput}) => {
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [ingredients, setIngredients] = useState("")
  
  const removeInput = () => {
    setAddInput(addInput - 1);
  }

  const modalOpen = () => {
    setOpenModal(true)
  }

  return (
    <div>
      <input type="text" placeholder="재료들" defaultValue={ingredients} />
      <input type="button" value="재료 조회" onClick={() => {modalOpen()}}></input>
      <SearchIngredientsModal openModal={openModal} setOpenModal={setOpenModal} setIsOpen={setIsOpen} setIngredients={setIngredients}></SearchIngredientsModal>
      <input type="button" value="재료 삭제" onClick={() => {removeInput()}} />
    </div>
  );
};

export default AddIngredients;
