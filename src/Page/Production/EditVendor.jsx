import { useEffect, useState } from "react";
import axios from "axios";
const EditVendor = (props) => {
  const { vendor } = props;
  const [name, setName] = useState(vendor.이름);
  const [phone, setPhone] = useState(vendor.전화번호);
  const [manager, setManager] = useState(vendor.담당자);
  const [comment, setComment] = useState(vendor.코멘트);
  useEffect(() => {
    setName(vendor.이름);
    setPhone(vendor.전화번호);
    setManager(vendor.담당자);
    setComment(vendor.코멘트);
  }, [vendor]);

  const editVendorHandler = async (e) => {
    e.preventDefault()
    const url = `api/vendor/${vendor.벤더ID}`;
    const updatedVendor = { ...vendor, 이름: name, 전화번호: phone, 담당자: manager, 코멘트: comment };
    const res = await axios.put(url, updatedVendor);
    props.closeEditor();
    props.getVendor();
  };
  return (
    <div>
      <h2>거래처 수정</h2>
      <form onSubmit={editVendorHandler}>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="phone">전화번호</label>
        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <label htmlFor="manager">담당자</label>
        <input type="text" id="manager" value={manager} onChange={(e) => setManager(e.target.value)} />
        <label htmlFor="comment">코멘트</label>
        <input type="text" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button>저장</button>
        <button type="button" onClick={props.closeEditor}>
          Cancle
        </button>
      </form>
    </div>
  );
};

export default EditVendor;
