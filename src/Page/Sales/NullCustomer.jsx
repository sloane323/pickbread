import { useState, useMemo } from "react";

/* 비회원일 때 작동하는 컴포넌트 */
const NullCustomer = (props) => {
  /* 결제 모드에 대한 state */
  const [paymentMode, setPaymentMode] = useState("");
  /* props 받아오기 */
  const { nullCustomerData, setNullCustomerData } = props;

  let isChecked;
  console.log(isChecked);

  /* 클릭했을 때 비회원의 결제 모드를 지정하는 메서드 */
  const handleButtonClick = (event) => {
    /* 구조 분해 */
    const { value } = event.target;
    /* 이렇게 대입한다면 클릭된 요소 자체를 isChecked에 반환....... */
    isChecked = event.target;
    console.log(isChecked);
    if (isChecked) {
      /* isChecked에 반환된 요소는 항상 있을 것이고 */
      setPaymentMode(value);
      /* 결제 모드에 대한 값을 받으며 */
      setNullCustomerData(value);
      /* 비회원 데이터에도 "현금", "결제" 이러한 버튼의 값이 들어갈 것 같은데.... */
      console.log(value);
    } else {
      /* else 라는 조건이 성립하지 않을 것으로 생각됨 isChecked를 비우거나 하지 않기 때문에 */
      setNullCustomerData([]);
    }
  };

  /* useMemo Hook을 적용해서, paymentMode가 handleButtonClick을 통해 변하게 되었을 때만 요소를 렌더링할 수 있게 하였음
  단 비회원, 사용가능 포인트, 사용 포인트가 동적으로 변하게 만들 수는 있는지 모르겠음 */
  const RenderNullCustomer = useMemo(
    () => (
      paymentMode !== "" ? (
      <>
        <span> 고객이름: 비회원</span>
        <span> 사용 가능 포인트: 0</span>
        <span> 사용포인트 : 0 </span>
      </>) : ""
    ),
    [paymentMode]
  )

  return (
    <div>
      {/* <>
        <span> 고객이름: 비회원</span>
        <span> 사용 가능 포인트: 0</span>
        <span> 사용포인트 : 0 </span>
      </> */}
      {RenderNullCustomer}
      <div>
        <span>결제모드: {paymentMode}</span>
        <button value="카드" onClick={handleButtonClick}>
          카드
        </button>
        <button value="현금" onClick={handleButtonClick}>
          현금
        </button>
      </div>
    </div>
  );
};
export default NullCustomer;
