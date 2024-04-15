import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
      .then((res) => {
        setUsers(res.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.username[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>{user.username}</div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <button
          className="bg-zinc-800 p-2 rounded-md font-semibold  text-white"
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.username);
          }}
        >
          Send Money{" "}
        </button>
      </div>
    </div>
  );
}
