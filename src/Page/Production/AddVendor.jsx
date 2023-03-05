// 벤더(거래처) 조회/등록/삭제 페이지
import axios from "axios";
import { useEffect, useState } from "react";

const AddVendor = () => {
  // 입력받을 state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [officer, setOfficer] = useState("");
  const [comment, setComment] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);


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

  // 밴더 검색 조회 
  const handleSearch = (event) => {
    event.preventDefault();
    axios.get(`/api/vendor?search=${searchQuery}`).then((response) => {
      setInputData(response.data);
    });
  };

  const handleEdit = (vendor) => {
    setSelectedVendor(d);
    setShowEditForm(true);
  };

  

  return (
    <div>
      
      <div>
        <h2>거래처 등록 하기 </h2>
        <form onSubmit={onSubmit}>
          {/* vendor ID 제외 */}
         
          <div class="input-wrapper">
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }} required
          />
          <label for="name">이름</label> </div>

          <div class="input-wrapper">
          <input
            type="text"
            onChange={(e) => {
              setPhone(e.target.value);
            }} required
          />
          <label for="phone">전화번호</label> </div>
          <div class="input-wrapper">
          <input
            type="text"
            onChange={(e) => {
              setOfficer(e.target.value);
            }} required
          /><label for="manager">담당자</label>
          </div>

          <div class="input-wrapper">
          <input
            type="text"
            onChange={(e) => {
              setComment(e.target.value);
            }} required
          /><label for="comment">코멘트/할인율</label>
          </div>
          <button onClick={onSubmit}> 추가 </button>
        </form>
      </div>

      <div>
        <h2>거래처</h2>
        <div>
        <form onSubmit={handleSearch}>
        <div className="input-wrapper">
          <input type="text" name="searchQuery" 
          value={searchQuery} 
          onChange={(event) => setSearchQuery(event.target.value)} required/>
          <label>이름 & 전화번호</label>
          </div>
          <button type="submit">Search</button>
        </form>
        {showEditForm && selectedVendor && (
        <div>
          <EditForm d={selectedVendor} onSave={handleSave} onCancel={handleCancel} /> <hr />
        </div>
      )}
      </div> 
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
              inputData.map((vendor, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{vendor.이름}</td>
                  <td>{vendor.전화번호}</td>
                  <td>{vendor.담당자}</td>
                  <td>{vendor.코멘트}</td>
                  <td>
                    <button onClick={() => deleteVendor(vendor.벤더ID)}>X</button>
                    <button onClick={() => handleEdit(vendor)}>수정</button>

                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default AddVendor;
