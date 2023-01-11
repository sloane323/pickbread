/* 원자재 등록 페이지 */
import React from 'react'
/* src 안에서만 import 할 수 있다. */
/* import { posting } from '../../server/server' */

const AddMaterial = () => {
  return (
    <div>
      {/* 특정 페이지로 갈까, js 파일로 갈까? */}
      <form action="http://localhost:4000/api/material" method='post'>
        {/* 원자재 ID */}
        <input type="text" placeholder='원자재 ID' />
        {/* 원자재 이름 */}
        <input type="text" placeholder='원자재 이름' />
        {/* 원자재 가격 */}
        <input type="text" placeholder='원자재 가격' />
        {/* 원자재 브랜드 */}
        <input type="text" placeholder='원자재 브랜드' />
        <input type="submit" value="제출" />
      </form>
    </div>
  )
}

export default AddMaterial
