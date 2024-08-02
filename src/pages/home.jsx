import "../App.css";
import React, { useState, useEffect, useRef } from "react";

import Lists from "../components/Lists";
import apiData from "../helper/ApiData";
import logout from "../helper/logout";
import { useNavigate } from "react-router-dom";
import finishEvaluation from "../helper/finishEvaluation";

function Home() {
  const [listCategory, setListCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const loginStatus = localStorage.getItem("login");
    if (!loginStatus) {
      navigate("/login");
    }
  }, []);

  const hasConfirmed = useRef(false);
  useEffect(() => {
    const workingStatus = localStorage.getItem("working");
    const category = localStorage.getItem("category");
    const difficulty = localStorage.getItem("difficulty");
    if (workingStatus && !hasConfirmed.current) {
      const tryAgain = window.confirm("Terdapat kuis yang belum selesai. Apakah anda ingin melanjutkan?");
      if (tryAgain) {
        hasConfirmed.current = true;
        alert("Selamat Melanjutkan");
        navigate(`/category/${category}/dificulty/${difficulty}`);
      } else {
        finishEvaluation();
      }
    }
    return () => {};
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await apiData([], "GET", "data/category.json");
      const data = await resp.json();
      setListCategory(data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 gap-14 p-10">
      <p onClick={() => logout()} className="absolute top-6 right-6 p-4 text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl shadow-lg shadow-black hover:shadow-md hover:shadow-black cursor-pointer">
        Logout
      </p>
      <h1 className="text-white font-black text-5xl">Choose your interests</h1>
      <Lists datas={listCategory} route="/category/" />
    </div>
  );
}

export default Home;
