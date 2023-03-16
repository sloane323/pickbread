import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
const PointDetail = () => {
  const params = useParams();
  const [pointLog, setPointLog] = useState();
  const totalPoint = pointLog
    ? pointLog.reduce((acc, current) => {
        return acc + current.포인트;
      }, 0)
    : 0;

  /** 고객 ID를 통한 고객 정보 및 포인트 내역 조회 */
  const getPointLogByCustomerId = async () => {
    const config = {
      url: `/api/point/log/${params.id}`,
      method: "GET",
    };
    const res = await axios(config);
    setPointLog(res.data);
  };

  useEffect(() => {
    getPointLogByCustomerId();
  }, []);

  return (
    <div>
      <h2>포인트 내역</h2>
      <h3>{pointLog && pointLog.length > 0 && `${pointLog[0].이름}님의 잔여 포인트 : ${totalPoint}`}</h3>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>시간</th>
            <th>포인트</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          {pointLog &&
            pointLog.map((log, idx) => {
              return (
                <tr key={idx + 1}>
                  <td>{idx + 1}</td>
                  <td>{log.생성시간}</td>
                  <td>{log.포인트}</td>
                  <td>{log.내용}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default PointDetail;
