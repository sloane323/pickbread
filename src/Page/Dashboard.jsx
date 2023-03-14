const Dashboard = () => {
    const todayTime = () => {
        let now = new Date();  // 현재 날짜 및 시간
        let todayYear = now.getFullYear(); 
        let todayMonth = now.getMonth() + 1;
        let todayDate = now.getDate();
        const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        let dayOfWeek = week[now.getDay()];
        return todayYear + '.' + todayMonth + '.' + todayDate + ' - ' +  dayOfWeek 
        ;
    }

    return ( <div>
       <h1>Dashboard </h1> 
       <div>
       <div>{todayTime().slice(0, 9)}
          <span>{todayTime().slice(9, 15)}</span>
        </div>
             고객 이름 </div>
       <div> <span>생산</span>
       원자재 구입 /  제품 생산 / 유통기한 확인 
         </div>

       <div> <span>판매</span>
       어제 판매 / 오늘 판매 / 방문고객 </div>
    
    </div> );
}
 
export default Dashboard;