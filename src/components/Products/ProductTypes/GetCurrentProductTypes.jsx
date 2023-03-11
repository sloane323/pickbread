import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";

const GetCurrentProductTypes = () => {
  const [products, setProducts] = useState();
  const [recipes, setRecipes] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const getProducts = async () => {
    const url = "/api/product";
    const response = await axios.get(url);
    setProducts(response.data);
  };
  const getRecipes = async () => {
    const url = "/api/recipe";
    const response = await axios.get(url);
    setRecipes(response.data);
  };
  useEffect(() => {
    getProducts();
    getRecipes();
  }, []);
  const deleteData = (url, id) => {
    return axios.delete(url, { data: { id } });
  };
  const deleteHandler = async (id) => {
    const filteredRecipe = recipes.filter((recipe) => recipe.제품ID === id);
    for(let recipes of filteredRecipe){
      await deleteData("/api/recipe", recipes.레시피ID);  
    }
    await deleteData("/api/product", id);
    getProducts();
    getRecipes();
  };
  const searchProducts = async () => {
    const url = `/api/product/${searchQuery}`;
    const response = await axios.get(url);
    setProducts(response.data);
  }

  return (
    <div>
      <h1>제품 타입 조회</h1>
      <Link to="/production/add-product">제품 등록</Link>
      <div>
        <input type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
        <button onClick={searchProducts}>검색</button>
        <button onClick={getProducts}>초기화</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>no</th>
            <th>이름</th>
            <th>사이즈</th>
            <th>가격</th>
            <th>레시피</th>
            <th>설정</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product, idx) => (
              <tr key={product.제품ID}>
                <td>{idx + 1}</td>
                <td>{product.이름}</td>
                <td>
                  {product.사이즈}
                  {product.단위}
                </td>
                <td>{product.가격}원</td>
                <td>
                  <ul>
                    {recipes &&
                      recipes
                        .filter((recipe) => {
                          return recipe.제품ID === product.제품ID;
                        })
                        .map((recipe, idx) => {
                          return <li key={idx}>{recipe.이름}</li>;
                        })}
                  </ul>
                </td>
                <td>
                  <button>
                    <Link to={`/production/edit-product/${product.제품ID}`}>수정</Link>
                  </button>
                  <button onClick={() => deleteHandler(product.제품ID)}>삭제</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetCurrentProductTypes
