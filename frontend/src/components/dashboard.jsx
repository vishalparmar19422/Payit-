import React, { useEffect, useState } from "react";
import { Appbar } from "./appbar";
import { Balance } from "./balance";
import { Users } from "./user";
import { useNavigate } from "react-router-dom";



const Dashboard = () => {

const navigate = useNavigate();
const [token, setToken] = useState(localStorage.getItem("token"));
useEffect(() => {
  if (!token) {
    navigate("/signin");
  }
}, [token]);


  
  return (
    <>
      <Appbar />
      <div className="main m-8">
        <Balance  />
        <Users />
      </div>
    </>
  );
};

export default Dashboard;
