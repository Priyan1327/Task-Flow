import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, setAuth } from "../Slices/SliceAuth"; // your redux slice
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import imgage from '../assets/images.jpg';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local form states
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        { username, password }, 
        { withCredentials: true }
      );

      // Storing user info including role from backend
      dispatch(setUser({ username, role: res.data.role }));
      dispatch(setAuth(true));

      toast.success("Login successful!");
      navigate("/dash");
    } catch (error) {
      console.error("Login failed:", error.response?.data);
      toast.error("Invalid login");
    }
  };

  return (
    <>
      <div
        className='flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center'
        style={{backgroundImage: `url(${imgage})`}}
      >
        <div className='flex justify-center mt-[5%]'>
          <div className="p-3 border-2 rounded-2xl flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4 text-white">Login</h1>

            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-64">
              <div>
                <label htmlFor="username" className='text-white'>Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer mt-1"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className='text-white'>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer mt-1"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 hover:bg-blue-900 w-full cursor-pointer rounded-2xl"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="bg-blue-600 text-white py-2 hover:bg-blue-900 w-full cursor-pointer mt-2 rounded-2xl"
              >
                Register
              </button>
            </form>
          </div>
        </div>
        <Toaster position="top-center" />
      </div>
    </>
  );
}

export default Login;
