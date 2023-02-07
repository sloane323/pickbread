import React from "react";
import { useState } from "react";
import SearchIngredientsModal from "./SearchIngredientsModal";

/* AddProduct 페이지에서 props 받아오기 */
const AddIngredients = ({key, addInput, setAddInput, ingredients, setIngredients}) => {
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  /* 이쪽은 이제 filter로 수정해야 할 메서드 */
  const removeInput = () => {
    setAddInput(addInput - 1);
  }

  /* 모달 오픈 메서드, 이상 없음 */
  const modalOpen = () => {
    setOpenModal(true)
  }

  return (
    <div>
      <input type="text" placeholder="재료들" value={ingredients} />
      <input type="button" value="재료 조회" onClick={() => {modalOpen()}}></input>
      {/* 재료를 검색하는 모달, 모달을 열고 닫는 state와 setter를 전달, setIngredients를 여기에서도 전달 */}
      <SearchIngredientsModal openModal={openModal} setOpenModal={setOpenModal} setIsOpen={setIsOpen} setIngredients={setIngredients}></SearchIngredientsModal>
      <input type="button" value="재료 삭제" onClick={() => {removeInput()}} />
    </div>
  );
};

export default AddIngredients;
