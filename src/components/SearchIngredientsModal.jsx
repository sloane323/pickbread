/* 모달이 뜨자마자 재료들을 모두 볼 수 있어야 함, useEffect

+ 재료 추가 컴포넌트에 값을 전달하기 원함
재료 추가 컴포넌트 input의 value 쪽으로 값을 전달할 수 있어야 함, state로 시도 */

import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchIngredientsModal = ({
  openModal,
  setOpenModal,
  setIsOpen,
  setIngredients,
}) => {
  const [stocks, setStocks] = useState(null);

  const getStocks = async () => {
    try {
      const response = await axios.get(`/api/material`);
      /* console.log(response.data) */
      setStocks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const modalClose = () => {
    setOpenModal(false);
  };

  const secondClose = () => {
    setIsOpen(false);
  };

  const toSetIngredients = (event, IngreName) => {
    setIngredients(IngreName);
    setOpenModal(false);
  };

  useEffect(() => {
    getStocks();
  }, []);

  return (
    <div>
      {openModal ? (
        <div>
          <div>
            <button onClick={modalClose}>X</button>
          </div>
          <div>
            <h1>원자재 재고 선택</h1>
          </div>
          <table>
            <thead>
              <tr>
                <td>이름</td>
                <td>사이즈</td>
                <td>단위</td>
                <td>가격</td>
                <td>브랜드</td>
              </tr>
            </thead>
            <tbody>
              {stocks ? (
                stocks.map((stock) => (
                  <tr key={stock.원자재ID}>
                    <td>{stock.이름}</td>
                    <td>{stock.사이즈}</td>
                    <td>{stock.단위}</td>
                    <td>{stock.가격}</td>
                    <td>{stock.브랜드}</td>
                    <td>
                      <button
                        onClick={(event) => toSetIngredients(event, stock.이름)}
                      >
                        재료 이름 등록
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>NOT YET</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default SearchIngredientsModal;
