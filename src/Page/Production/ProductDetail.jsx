import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router'

const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);

	const getProduct = async () => {
		try {
			const response = await axios.get(`/api/production/${id}`);
			setProduct(response.data[0])
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getProduct();
	}, [id])

  return (
    <div>
			<h1>제품 재고확인 상세 페이지</h1>
      {id}
      <table>
        <thead>
          <tr>
            <td>제품ID</td>
            <td>이름</td>
            <td>사이즈</td>
            <td>단위</td>
            <td>가격</td>
          </tr>
        </thead>
        <tbody>
          {/* stock도 배열 형태로 되어있다보니,
          위의 getStock에서 인덱스로 처리하거나 map으로 쓰는 방법이 있다. */}
          {product ? (
            <tr key={product.제품ID}>
              <td>{product.제품ID}</td>
            </tr>
          ) : (
            <tr>
              <td>NOT YET</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProductDetail