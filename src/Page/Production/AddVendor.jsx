// 벤더(거래처) 조회/등록/삭제 페이지
import axios from "axios";
import { useEffect, useState } from "react";

const AddVendor = () => {
  // 입력받을 state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [officer, setOfficer] = useState("");
  const [comment, setComment] = useState("");

  // 조회할 state
  const [inputData, setInputData] = useState();

  // 거래처 등록 함수
  const post = () => {
    const url = "/api/vendor";
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("officer", officer);
    formData.append("comment", comment);

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    return axios.post(url, formData, config);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await post();
    getVendor();
    setName("");
    setPhone("");
    setOfficer("");
    setComment("");
  };

  // 거래처 삭제 함수
  const deleteVendor = (id) => {
    const url = `/api/vendor/`;
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    return axios.delete(url, { data: { id } }, config);
  };

  // 거래처 조회 함수
  const getVendor = () => {
    axios.get("/api/vendor").then((res) => setInputData(res.data));
  };
  // 렌더되면 바로 조회
  useEffect(() => {
    getVendor();
  }, []);

  return (
    <div>
      <div>
        <h2>조회</h2>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>전화번호</th>
              <th>담당자</th>
              <th>코멘트</th>
              <th>설정</th>
            </tr>
          </thead>
          <tbody>
            {inputData &&
              inputData.map((d, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{d.이름}</td>
                  <td>{d.전화번호}</td>
                  <td>{d.담당자}</td>
                  <td>{d.코멘트}</td>
                  <td>
                    <button onClick={() => deleteVendor(d.벤더ID)}>X</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>거래처 등록 페이지</h2>
        <form onSubmit={onSubmit}>
          {/* vendor ID 제외 */}
          이름{" "}
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          전화번호{" "}
          <input
            type="text"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <br />
          담당자{" "}
          <input
            type="text"
            onChange={(e) => {
              setOfficer(e.target.value);
            }}
          />
          <br />
          코멘트/할인율{" "}
          <input
            type="text"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button>제출</button>
        </form>
      </div>
    </div>
  );
};

export default AddVendor;
