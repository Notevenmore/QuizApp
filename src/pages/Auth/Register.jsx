import "../../App.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../../components/Form";
import apiData from "../../helper/ApiData";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  useEffect(() => {
    const loginStatus = localStorage.getItem("login");
    if (loginStatus) {
      navigate("/home");
    }
  }, []);

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
    {
      value: confirm,
      setValue: setConfirm,
      placeholder: "Konfirmasi Kembali Password",
      type: "password",
    },
  ];

  const handleSubmit = async (e) => {
    if (data[2].value == data[1].value) {
      const dataUser = {
        email: data[0].value,
        password: data[1].value,
      };
      const response = await apiData(dataUser, "POST", "http://127.0.0.1:8000/api/register");
      const dataResponse = await response.json();
      if (response.ok) {
        alert(dataResponse.message);
        navigate("/login");
      } else {
        alert("Register Gagal dilakukan, silahkan coba lagi");
      }
    } else {
      return alert("Password dan Konfirmasinya berbeda");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-gradient-to-br shadow-2xl from-indigo-500 via-purple-500 to-pink-500 min-w-[26rem] min-h-24 rounded-xl flex flex-col items-center p-10 gap-5">
        <h1 className="font-black text-6xl text-white">Quiz</h1>
        <h1 className="font-black text-4xl text-white">Register</h1>
        <Form data={data} req="Sign Up" handleSubmit={handleSubmit} />
        <p>
          Already have account?{" "}
          <span onClick={() => navigate("/login")} className="text-blue-500 underline underline-offset-2 cursor-pointer">
            Sign In Now!
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
