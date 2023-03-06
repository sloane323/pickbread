// 벤더(거래처) 조회/등록/삭제 페이지
import axios from "axios";
import { useEffect, useState } from "react";
import EditVendor from "./EditVendor";

const AddVendor = () => {
  // 입력받을 state
  const [vendors, setVendors] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [manager, setManager] = useState("");
  const [comment, setComment] = useState("");
  const [editVendorIsShown, setEditVendorIsShown] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState();
  const resultPerPage = 10;
  const totalPage = vendors ? Math.ceil(vendors[0].카운터 / resultPerPage) : null;

  // 거래처 등록 함수
  const post = () => {
    const url = "/api/vendor";
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("manager", manager);
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
    setManager("");
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
  const getVendor = async (search) => {
    if (search) {
      const res = await axios.get(`/api/vendor?page=${currentPage}&result=${resultPerPage}&search=${search}`);
      setVendors(res.data);
    } else {
      const res = await axios.get(`/api/vendor?page=${currentPage}&result=${resultPerPage}`);
      setVendors(res.data);
    }
  };
  // 렌더되면 바로 조회
  useEffect(() => {
    getVendor();
  }, [currentPage]);

  const openEditor = (vendor) => {
    setEditVendorIsShown(true);
    setSelectedVendor(vendor);
  };
  const closeEditor = () => {
    setEditVendorIsShown(false);
    setSelectedVendor();
  };
  const searchVendor = (e) => {
    e.preventDefault();
    getVendor(search);
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
              }}
              value={name}
              required
            />
            <label for="name">이름</label>
          </div>

          <div class="input-wrapper">
            <input
              type="text"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              value={phone}
              required
            />
            <label for="phone">전화번호</label>
          </div>

          <div class="input-wrapper">
            <input
              type="text"
              onChange={(e) => {
                setManager(e.target.value);
              }}
              value={manager}
              required
            />
            <label for="manager">담당자</label>
          </div>

          <div class="input-wrapper">
            <input
              type="text"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
              required
            />
            <label for="comment">코멘트/할인율</label>
          </div>
          <button onClick={onSubmit}> 추가 </button>
        </form>
      </div>
      {editVendorIsShown && selectedVendor && <EditVendor vendor={selectedVendor} closeEditor={closeEditor} getVendor={getVendor} />}
      <div>
        <h2>거래처 조회</h2>
        <form onSubmit={searchVendor}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button>Search</button>
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
            {vendors &&
              vendors.map((d, idx) => (
                <tr key={idx}>
                  <td>{(currentPage - 1) * resultPerPage + idx + 1}</td>
                  <td>{d.이름}</td>
                  <td>{d.전화번호}</td>
                  <td>{d.담당자}</td>
                  <td>{d.코멘트}</td>
                  <td>
                    <button onClick={() => deleteVendor(d.벤더ID)}>삭제</button>
                    <button onClick={() => openEditor(d)}>수정</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {totalPage &&
          Array(totalPage)
            .fill()
            .map((el, idx) => {
              return (
                <button key={idx + 1} onClick={() => setCurrentPage(idx + 1)}>
                  {idx + 1}
                </button>
              );
            })}
      </div>
    </div>
  );
};

export default AddVendor;
