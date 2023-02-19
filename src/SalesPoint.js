// 판매 페이지에서 적용할 포인트 생성 함수
import { useState } from 'react';

const SalesPoint = () => {

    // 포인트 추가, 사용,
    const [pointRate, setPointRate] = useState();
    // const [usedPoint, setUsedPoint] = useState();
    // 판매 총가격 받아오기 - useEffect
    const totalCost = 100000;

    // 계산
    const resultPoint = totalCost - totalCost*pointRate*0.01;


    const changeRateHandler = (e) => {
        setPointRate(e.target.value);
    }



    return ( 
        <div>
            <p>가격: {totalCost}</p>
            <p></p>포인트 적립율: <input onChange={changeRateHandler} value={pointRate} type="number" ></input>%
            <p>적립된 포인트 : {resultPoint}</p>
        </div>
    );
}
export default SalesPoint;
