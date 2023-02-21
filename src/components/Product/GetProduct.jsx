import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const GetProduct = () => {
  const [products, setProducts] = useState();
  const [recipes, setRecipes] = useState();
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

  return (
    <div>
      <Link to="/production/add-product">제품 등록</Link>
      <div>
        <input type="text" />
        <button> 검색 </button>
      </div>
      <h2>조회</h2>
      <table>
        <thead>
          <tr>
            <th>no</th>
            <th>이름</th>
            <th>사이즈</th>
            <th>가격</th>
            <th>레시피</th>
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
                        .map((recipe) => {
                          return <li>{recipe.이름}</li>;
                        })}
                  </ul>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetProduct;
