import { useEffect, useState } from "react";
const Users = () => {
  const [users, setUsers] = useState(null);
  const getUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    users && (
      <div>
        <p>아이디 : {users[0]?.user_id}</p>
        <p>이름 : {users[0]?.name}</p>
        <p>이메일 : {users[0]?.email}</p>
      </div>
    )
  );
};

export default Users;
