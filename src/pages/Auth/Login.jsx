import "../../App.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../../components/Form";
import apiData from "../../helper/ApiData";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const loginStatus = localStorage.getItem("login");
    if (loginStatus) {
      navigate("/home");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = [
    {
      value: email,
      setValue: setEmail,
      placeholder: "Masukkan Email",
      type: "text",
    },
    {
      value: password,
      setValue: setPassword,
      placeholder: "Masukkan Password",
      type: "password",
    },
  ];

  const handleSubmit = async (e) => {
    const dataLogin = {
      email: data[0].value,
      password: data[1].value,
    };
    const response = await apiData(dataLogin, "POST", "http://127.0.0.1:8000/api/login");
    const dataResponse = await response.json();
    if (response.ok) {
      alert(dataResponse.message);
      localStorage.setItem("userdata_id", dataResponse.userdata_id);
      localStorage.setItem("login", true);
      navigate("/home");
    } else {
      alert(dataResponse.message);
      if (!dataResponse.email) {
        navigate("/");
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-gradient-to-br shadow-2xl from-indigo-500 via-purple-500 to-pink-500 min-w-[26rem] min-h-24 rounded-xl flex flex-col items-center p-10 gap-5">
        <h1 className="font-black text-6xl text-white">Quiz</h1>
        <h1 className="font-black text-4xl text-white">Login</h1>
        <Form data={data} req="Sign In" handleSubmit={handleSubmit} />
        <p>
          Doesn't have account?{" "}
          <span onClick={() => navigate("/")} className="text-blue-500 underline underline-offset-2 cursor-pointer">
            Sign Up Now!
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
