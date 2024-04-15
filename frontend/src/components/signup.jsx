import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    if (token) {
      Navigate("/dashboard");
    }
  }, [token]);

  return (
    <div className="bg-stone-200 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded-lg shadow-lg text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="Username"
            placeholder=" Username"
          />

          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />

          <button
            onClick={async () => {
              const res = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  username,
                  email,
                  password,
                }
              );
              localStorage.setItem("token", res.data.token);
              Navigate("/dashboard");
            }}
            type="submit"
            className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Create Account
          </button>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link
            to={"/signin"}
            className="no-underline border-b border-blue text-blue"
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Signup;
